import MoneyGame from "./MoneyGame.mjs";
import NumberUtil from "../../utils/NumberUtil.js";
import Timer from "../../utils/Timer.js";

import * as PokerState from "../../../src/server/poker/PokerState.mjs";
import * as PokerUtil from "../../../src/server/poker/PokerUtil.mjs";

export default class CashGame extends MoneyGame {
	constructor(id, backend) {
		super("cashgame",id,backend);

		this.timer=new Timer();
		this.timer.on("timeout",this.onTimeout);

		this.on("message",this.onMessage);
		this.on("connect",this.onConnect);
		this.on("disconnect",this.onDisconnect);
		this.on("finalize",this.onFinalize);

		this.reduce((t)=>{
			if (!t) {
				console.log("no suspended state, creating new");
				t=PokerState.createPokerState(this.conf);
			}

			if (t.state=="idle")
				return this.enterIdleState(t);

			this.resetTimeout(t);

			return t;
		});
	}

	onFinalize=()=>{
		this.timer.clearTimeout();
	}

	onTimeout=()=>{
		this.reduce(t=>this.action(t));
	}

	onConnect=(c)=>{
		this.reduce((t)=>{
			this.presentToConnection(t,c);
			return t;
		});
	}

	onDisconnect=()=>{
		this.reduce(async (t)=>{
			t=await this.cleanUpConnections(t);
			this.presentToAll(t);

			return t;
		});
	}

	onMessage=(user, message)=>{
		this.reduce((t)=>{
			if (PokerUtil.isUserSpeaker(t,user))
				return this.action(t,message.action,message.value);

			else
				return this.nonSpeakerAction(t,user,message);
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

		this.presentToAll(t);
		return t;
	}

	async sitInUser(t, user, amount) {
		try {
			amount=NumberUtil.safeParseInt(amount);
			amount=Math.max(t.minSitInAmount,amount);
			amount=Math.min(t.maxSitInAmount,amount);

			let i=PokerUtil.getSeatIndexByUser(t,user);
			if (i<0)
				throw new Error("Not reserved.");

			await this.addUser(user,amount);

			t=PokerState.sitInUser(t,i,user,amount);
		}

		catch (e) {
			return PokerState.setUserDialogText(t,user,String(e));
		}

		if (t.state=="idle") {
			t=PokerState.checkStart(t);
			this.resetTimeout(t);
		}

		return t;
	}

	async action(t, action, value) {
		this.timer.clearTimeout();

		t=PokerState.action(t,action,value);
		if (t.state=="idle")
			return this.enterIdleState(t);

		this.resetTimeout(t);
		this.presentToAll(t);

		return t;
	}

	async enterIdleState(t) {
		await this.updateUserBalances(PokerUtil.getSeatedInUserChips(t));
		await this.cleanUpConnections(t);

		//t=PokerState.applyConfiguration(t,this.conf);
		t=PokerState.checkStart(t);

		this.resetTimeout(t);
		this.presentToAll(t);

		return t;
	}

	async removeAllUsers(t) {
		let users=PokerUtil.getSeatedInUsers(t);
		for (let user of users) {
			await this.removeUser(user);
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
					await this.removeUser(user);
					t=PokerState.removeUser(t,user);
				}
			}
		}

		return t;
	}

	presentToAll(t) {
		for (let c of this.connections)
			this.presentToConnection(t,c);
	}

	presentToConnection(t, c) {
		let presented=PokerState.present(t,c.user,this.timer.getTimeLeft());
		c.send(JSON.stringify(presented));
	}

	resetTimeout(t) {
		this.timer.clearTimeout();

		let delay=PokerUtil.getTimeout(t);
		if (delay)
			this.timer.setTimeout(delay);

		return t;
	}
}
