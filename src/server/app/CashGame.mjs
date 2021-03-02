import Mutex from "../../utils/Mutex.js";

import * as PokerState from "../../../src/server/poker/PokerState.mjs";
import * as PokerUtil from "../../../src/server/poker/PokerUtil.mjs";

export default class CashGame {
	constructor(id, backend) {
		this.id=id;
		this.backend=backend;
		this.mutex=new Mutex();
		this.connections=[];
		this.load();
	}

	async critical(fn) {
		let unlock=await this.mutex.lock();
		await fn();
		unlock();
	}

	load() {
		this.critical(async ()=>{
			let data=await this.backend.fetch({
				call: "getCashGame",
				tableId: this.id
			});

			if (data.runState=="running") {
				console.error("Table is already running: "+channelId);
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

	onDisconnect=()=>{
		this.critical(async ()=>{
			this.cleanUpConnections();
		});
	}

	addConnection(ws) {
		this.critical(async ()=>{
			ws.onmessage=(ev)=>{
				let message=JSON.parse(ev.data);
				this.onMessage(ws,message);
			}
			this.connections.push(ws);
			this.present();
		});
	}

	present() {
		for (let connection of this.connections) {
			let p=PokerState.present(this.tableState,connection.user);
			connection.send(JSON.stringify(p));
		}
	}

	onMessage=(c, message)=>{
		this.critical(async ()=>{
			if (PokerUtil.isUserSpeaker(this.tableState,c.user))
				await this.action(message.action,message.value);

			else
				await this.nonSpeakerAction(c.user,message.action,message.value);
		});
	}

	async nonSpeakerAction(user, action, value) {
		switch (action) {
			case "seatJoin":
				let i=message.seatIndex;
				this.tableState=
					PokerState.reserveSeat(this.tableState,i,c.user);
				break;

			case "dialogCancel":
				this.tableState=
					PokerState.removeUser(this.tableState,c.user);
				break;

			case "dialogOk":
				this.backend.fetch({
					call: "joinCashGame",
					
				})
				this.tableState=PokerState.confirmReservation
				await this.sitInUser(c.user,message.value);
				break;
		}

		this.present();
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

			return;
		}

		this.tableState=PokerState.applyConfiguration(this.tableState,data);
		this.cleanUpConnections();

		await this.backend.fetch({
			call: "saveCashGameTableState",
			tableId: this.id,
			tableState: JSON.stringify(this.tableState),
			runState: "running"
		});

		this.tableState=PokerState.checkStart(this.tableState);
		this.resetTimeout();
	}

	async cleanUpConnections() {
		let users=PokerUtil.getReservingUsers(this.tableState);
		for (let user of users) {
			if (!this.isUserConnected(user))
				this.tableState=PokerState.removeUser(this.tableState,user);
		}

		if (this.tableState.state=="idle") {
			let users=PokerUtil.getSeatedUsers(this.tableState);
			for (let user of users) {
				if (PokerUtil.getUserSeatState(this.tableState,user)!="available") {
					if (!this.isUserConnected(user) ||
							!PokerUtil.getUserChips(this.tableState,user) ||
							PokerUtil.getUserSeatState(this.tableState,user)=="leave") {
						await this.backend.fetch({
							call: "leaveCashGame",
							tableId: channelId,
							user: user,
							amount: PokerUtil.getUserChips(this.tableState,user)
						});

						this.tableState=PokerState.removeUser(this.tableState,user);
					}
				}
			}
		}
	}

	clearTimeout() {
		if (this.timeout) {
			clearTimeout(this.timeout);
			this.timeout=null;
		}
	}

	resetTimeout() {
		this.clearTimeout();

		let t=PokerUtil.getTimeout(this.tableState);
		if (t)
			this.timeout=setTimeout(this.onTimeout,t);
	}
}