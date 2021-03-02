import Mutex from "../../utils/Mutex.js";
import {performance} from "perf_hooks";
import EventEmitter from "events";
import ArrayUtil from "../../utils/ArrayUtil.js";

import * as PokerState from "../../../src/server/poker/PokerState.mjs";
import * as PokerUtil from "../../../src/server/poker/PokerUtil.mjs";

export default class CashGame extends EventEmitter {
	constructor(id, backend) {
		super();

		this.id=id;
		this.backend=backend;
		this.mutex=new Mutex();
		this.connections=[];
		this.load();
	}

	async critical(fn) {
		let unlock=await this.mutex.lock();
		if (this.finalized) {
			console.log("will not run critical section, already finalized");
			unlock();
			return false;
		}

		try {
			await fn();
		}

		catch (e) {
			console.error(e);
			this.finalize();
		}

		unlock();
		return true;
	}

	finalize() {
		if (this.finalized)
			throw new Error("Already finalized");

		for (let c of this.connections)
			c.close();

		this.connections=[];

		this.finalized=true;
		this.emit("done",this);
	}

	async suspend() {
		await this.critical(async ()=>{
			await this.backend.fetch({
				call: "saveCashGameTableState",
				tableId: this.id,
				tableState: JSON.stringify(this.tableState),
				runState: "suspended"
			});

			this.finalize();
		});
	}

	load() {
		this.critical(async ()=>{
			console.log("Loading table: "+this.id);

			let data=await this.backend.fetch({
				call: "getCashGame",
				tableId: this.id
			});

			if (data.runState=="running") {
				console.error("Table is already running: "+this.id);
				throw new Error("Already running");
			}

			try {
				this.tableState=JSON.parse(data.tableState);
			}

			catch (e) {
				console.log("Table state not defined on load");
				if (data.status!="publish")
					throw new Error("Table not published");

				this.tableState=PokerState.createPokerState(data);
			}

			if (this.tableState.state=="idle")
				await this.enterIdleState();

			this.resetTimeout();
		});
	}

	onTimeout=()=>{
		this.critical(async ()=>{
			await this.action();
		});
	}

	onDisconnect=(ws)=>{
		this.critical(async ()=>{
			ArrayUtil.remove(this.connections,ws);
			await this.cleanUpConnections();

			if (!this.connections.length) {
				console.log("no more connections!");

				await this.backend.fetch({
					call: "saveCashGameTableState",
					tableId: this.id,
					tableState: JSON.stringify(this.tableState),
					runState: "suspended"
				});

				this.emit("done",this);
			}
		});
	}

	async addConnection(ws) {
		let run=await this.critical(async ()=>{
			ws.onmessage=(ev)=>{
				let message=JSON.parse(ev.data);
				this.onMessage(ws,message);
			}
			ws.onclose=(ev)=>{
				this.onDisconnect(ws);
			}

			this.connections.push(ws);
			this.present();
		});

		if (!run) {
			ws.close();
		}
	}

	onMessage=(c, message)=>{
		this.critical(async ()=>{
			if (PokerUtil.isUserSpeaker(this.tableState,c.user))
				await this.action(message.action,message.value);

			else
				await this.nonSpeakerAction(c.user,message);
		});
	}

	async nonSpeakerAction(user, message) {
		switch (message.action) {
			case "seatJoin":
				this.tableState=PokerState.reserveSeat(
					this.tableState,message.seatIndex,user);
				break;

			case "dialogCancel":
				this.tableState=PokerState.removeUser(
					this.tableState,user);
				break;

			case "dialogOk":
				await this.sitInUser(user,message.value);
				break;

			default:
				return;
		}

		this.present();
	}

	async sitInUser(user, amount) {
		try {
			await this.backend.fetch({
				call: "joinCashGame",
				user: user,
				amount: amount,
				tableId: this.id
			});

			this.tableState=PokerState.confirmReservation(
				this.tableState,user,amount);
		}

		catch (e) {
			this.tableState=PokerState.setUserDialogText(
				this.tableState,user,String(e));

			return;
		}

		await this.backend.fetch({
			call: "saveCashGameTableState",
			tableId: this.id,
			tableState: JSON.stringify(this.tableState),
			runState: "running"
		});

		if (this.tableState.state=="idle") {
			this.tableState=PokerState.checkStart(this.tableState);
			this.resetTimeout();
		}
	}

	async action(action, value) {
		this.clearTimeout();

		this.tableState=PokerState.action(this.tableState,action,value);
		if (this.tableState.state=="idle")
			await this.enterIdleState();

		this.resetTimeout();
		this.present();
	}

	async enterIdleState() {
		let data=await this.backend.fetch({
			call: "getCashGame",
			tableId: this.id
		});

		if (data.status!="publish") {
			await this.removeAllUsers();
			await this.backend.fetch({
				call: "saveCashGameTableState",
				tableId: this.id,
				tableState: "",
				runState: ""
			});

			this.finalize();
			return;
		}

		this.tableState=PokerState.applyConfiguration(this.tableState,data);
		await this.cleanUpConnections();

		await this.backend.fetch({
			call: "saveCashGameTableState",
			tableId: this.id,
			tableState: JSON.stringify(this.tableState),
			runState: "running"
		});

		this.tableState=PokerState.checkStart(this.tableState);
		this.resetTimeout();
	}

	async removeAllUsers() {
		let users=PokerUtil.getSeatedInUsers(this.tableState);
		for (let user of users) {
			await this.backend.fetch({
				call: "leaveCashGame",
				tableId: this.id,
				user: user,
				amount: PokerUtil.getUserChips(this.tableState,user)
			});

			this.tableState=PokerState.removeUser(this.tableState,user);
		}
	}

	async cleanUpConnections() {
		let users=PokerUtil.getReservingUsers(this.tableState);
		for (let user of users) {
			if (!this.isUserConnected(user))
				this.tableState=PokerState.removeUser(this.tableState,user);
		}

		if (this.tableState.state=="idle") {
			let users=PokerUtil.getSeatedInUsers(this.tableState);
			for (let user of users) {
				if (!this.isUserConnected(user) ||
						!PokerUtil.getUserChips(this.tableState,user) ||
						PokerUtil.getUserSeatState(this.tableState,user)=="leave") {
					await this.backend.fetch({
						call: "leaveCashGame",
						tableId: this.id,
						user: user,
						amount: PokerUtil.getUserChips(this.tableState,user)
					});

					this.tableState=PokerState.removeUser(this.tableState,user);
				}
			}
		}
	}

	present() {
		for (let connection of this.connections) {
			let p=PokerState.present(this.tableState,connection.user,this.getTimeLeft());
			connection.send(JSON.stringify(p));
		}
	}

	clearTimeout() {
		if (this.timeout) {
			clearTimeout(this.timeout);
			this.timeoutStarted=null;
			this.timeout=null;
		}
	}

	resetTimeout() {
		this.clearTimeout();

		let t=PokerUtil.getTimeout(this.tableState);
		if (t) {
			this.timeout=setTimeout(this.onTimeout,t);
			this.timeoutStarted=performance.now();
		}
	}

	getTimeLeft() {
		if (!this.timeout)
			return null;

		return (
			this.timeoutStarted+
			PokerUtil.getTimeout(this.tableState)-
			performance.now()
		);
	}

	isUserConnected(user) {
		if (!user)
			return false;

		for (let connection of this.connections)
			if (user==connection.user)
				return true;
	}
}