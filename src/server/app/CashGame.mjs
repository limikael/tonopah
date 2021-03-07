import {performance} from "perf_hooks";
import EventEmitter from "events";
import ArrayUtil from "../../utils/ArrayUtil.js";
import AsyncState from "../../utils/AsyncState.mjs";

import * as PokerState from "../../../src/server/poker/PokerState.mjs";
import * as PokerUtil from "../../../src/server/poker/PokerUtil.mjs";

export default class CashGame extends EventEmitter {
	constructor(id, backend) {
		super();

		this.id=id;
		this.backend=backend;
		this.connections=[];
		this.tableState=new AsyncState();
		this.tableState.on("finalized",this.onTableStateFinalized);

		this.tableState.apply(async ()=>{
			console.log("Loading table: "+this.id);

			let data=await this.backend.fetch({
				call: "getCashGame",
				tableId: this.id
			});

			let t;
			if (data.runState=="running")
				throw new Error("Already running");

			try {
				t=JSON.parse(data.tableState);
			}

			catch (e) {
				console.log("Table state not defined on load");
				if (data.status!="publish")
					throw new Error("Table not published");

				t=PokerState.createPokerState(data);
			}

			if (t.state=="idle")
				return this.enterIdleState(t);

			this.resetTimeout(t);

			return t;
		});
	}

	onTableStateFinalized=()=>{
		for (let ws of this.connections)
			ws.close();

		this.connections=[];
		this.clearTimeout();
		this.emit("done",this);
	}

	async suspend() {
		await this.tableState.apply(async (t)=> {
			await this.backend.fetch({
				call: "saveCashGameTableState",
				tableId: this.id,
				tableState: JSON.stringify(t),
				runState: "suspended"
			});

			return null;
		});
	}

	onTimeout=()=>{
		this.tableState.apply(t=>this.action(t));
	}

	onDisconnect=(ws)=>{
		this.tableState.apply(async (t)=>{
			ArrayUtil.remove(this.connections,ws);
			t=await this.cleanUpConnections(t);

			if (!this.connections.length) {
				console.log("no more connections!");

				await this.backend.fetch({
					call: "saveCashGameTableState",
					tableId: this.id,
					tableState: JSON.stringify(t),
					runState: "suspended"
				});

				return null;
			}

			return t;
		});
	}

	addConnection(ws) {
		if (this.tableState.isFinalized()) {
			ws.close();
			return;
		}

		this.connections.push(ws);

		ws.onmessage=(ev)=>{
			let message=JSON.parse(ev.data);
			this.onMessage(ws,message);
		}

		ws.onclose=(ev)=>{
			this.onDisconnect(ws);
		}

		this.tableState.apply((t)=>{
			this.present(t);
			return t;
		});
	}

	onMessage=(c, message)=>{
		this.tableState.apply((t)=>{
			if (PokerUtil.isUserSpeaker(t,c.user))
				return this.action(t,message.action,message.value);

			else
				return this.nonSpeakerAction(t,c.user,message);
		});
	}

	async nonSpeakerAction(t, user, message) {
		switch (message.action) {
			case "seatJoin":
				t=PokerState.reserveSeat(t,message.seatIndex,user);
				break;

			case "dialogCancel":
				t=PokerState.removeUser(t,user);
				break;

			case "dialogOk":
				t=await this.sitInUser(t,user,message.value);
				break;

			default:
				return;
		}

		this.present(t);
		return t;
	}

	async sitInUser(t, user, amount) {
		try {
			await this.backend.fetch({
				call: "joinCashGame",
				user: user,
				amount: amount,
				tableId: this.id
			});

			t=PokerState.confirmReservation(t,user,amount);
		}

		catch (e) {
			return PokerState.setUserDialogText(t,user,String(e));
		}

		await this.backend.fetch({
			call: "saveCashGameTableState",
			tableId: this.id,
			tableState: JSON.stringify(t),
			runState: "running"
		});

		if (t.state=="idle") {
			t=PokerState.checkStart(t);
			this.resetTimeout(t);
		}

		return t;
	}

	async action(t, action, value) {
		this.clearTimeout();

		t=PokerState.action(t,action,value);
		if (t.state=="idle")
			return this.enterIdleState(t);

		this.resetTimeout(t);
		this.present(t);

		return t;
	}

	async enterIdleState(t) {
		let data=await this.backend.fetch({
			call: "getCashGame",
			tableId: this.id
		});

		if (data.status!="publish") {
			t=await this.removeAllUsers(t);
			await this.backend.fetch({
				call: "saveCashGameTableState",
				tableId: this.id,
				tableState: "",
				runState: ""
			});

			return null;
		}

		t=PokerState.applyConfiguration(t,data);
		await this.cleanUpConnections(t);

		await this.backend.fetch({
			call: "saveCashGameTableState",
			tableId: this.id,
			tableState: JSON.stringify(t),
			runState: "running"
		});

		t=PokerState.checkStart(t);

		this.resetTimeout(t);
		this.present(t);

		return t;
	}

	async removeAllUsers(t) {
		let users=PokerUtil.getSeatedInUsers(t);
		for (let user of users) {
			await this.backend.fetch({
				call: "leaveCashGame",
				tableId: this.id,
				user: user,
				amount: PokerUtil.getUserChips(t,user)
			});

			t=PokerState.removeUser(t,user);
		}

		return t;
	}

	async cleanUpConnections(t) {
		let users=PokerUtil.getReservingUsers(t);
		for (let user of users) {
			if (!this.isUserConnected(user))
				t=PokerState.removeUser(t,user);
		}

		if (t.state=="idle") {
			let users=PokerUtil.getSeatedInUsers(t);
			for (let user of users) {
				if (!this.isUserConnected(user) ||
						!PokerUtil.getUserChips(t,user) ||
						PokerUtil.getUserSeatState(t,user)=="leave") {
					await this.backend.fetch({
						call: "leaveCashGame",
						tableId: this.id,
						user: user,
						amount: PokerUtil.getUserChips(t,user)
					});

					t=PokerState.removeUser(t,user);
				}
			}
		}

		return t;
	}

	present(t) {
		for (let connection of this.connections) {
			let p=PokerState.present(t,connection.user,this.getTimeLeft(t));
			connection.send(JSON.stringify(p));
		}

		return t;
	}

	clearTimeout() {
		if (this.timeout) {
			clearTimeout(this.timeout);
			this.timeoutStarted=null;
			this.timeout=null;
		}
	}

	resetTimeout(t) {
		this.clearTimeout();

		let delay=PokerUtil.getTimeout(t);
		if (delay) {
			this.timeout=setTimeout(this.onTimeout,delay);
			this.timeoutStarted=performance.now();
		}

		return t;
	}

	getTimeLeft(t) {
		if (!this.timeout)
			return null;

		return (
			this.timeoutStarted+
			PokerUtil.getTimeout(t)-
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