import MoneyGame from "./MoneyGame.mjs";
import NumberUtil from "../../utils/NumberUtil.js";
import Timer from "../utils/Timer.js";

import * as PokerState from "../../../src/server/poker/PokerState.mjs";
import * as PokerUtil from "../../../src/server/poker/PokerUtil.mjs";

export default class CashGame extends MoneyGame {
	constructor(conf, backend, mainLoop) {
		super(conf,backend,mainLoop);

		this.timer=new Timer(this.mainLoop);
		this.timer.on("timeout",this.onTimeout);
	}

	async init() {
		if (!this.gameState) {
			console.log("no suspended state, creating new");
			this.gameState=PokerState.createPokerState(this.conf);
		}

		if (this.gameState.state=="idle") {
			await this.cleanUpConnections();
			this.gameState=PokerState.applyConfiguration(this.gameState,this.conf);
		}

		this.resetTimeout();
	}

	finalize() {
		super.finalize();
		this.timer.clearTimeout();
	}

	onTimeout=async ()=>{
		await this.action();
	}

	async addConnection(c) {
		await super.addConnection(c);
		this.presentToConnection(c);
	}

	async removeConnection(c) {
		await super.removeConnection(c);
		await this.cleanUpConnections();
		this.presentToAll();
	}

	async handleMessage(user, message) {
		if (PokerUtil.isUserSpeaker(this.gameState,user))
			return await this.action(message.action,message.value);

		else
			await this.nonSpeakerAction(user,message);
	}

	async nonSpeakerAction(user, message) {
		switch (message.action) {
			case "seatJoin":
				this.gameState=PokerState.reserveSeat(this.gameState,message.seatIndex,user);
				break;

			case "dialogCancel":
				this.gameState=PokerState.removeUser(this.gameState,user);
				break;

			case "dialogOk":
				await this.sitInUser(user,message.value);
				break;

			default:
				return;
		}

		this.presentToAll();
	}

	async sitInUser(user, amount) {
		try {
			amount=NumberUtil.safeParseInt(amount);
			amount=Math.max(this.gameState.minSitInAmount,amount);
			amount=Math.min(this.gameState.maxSitInAmount,amount);

			let i=PokerUtil.getSeatIndexByUser(this.gameState,user);
			if (i<0)
				throw new Error("Not reserved.");

			await this.addUser(user,amount);

			this.gameState=PokerState.sitInUser(this.gameState,i,user,amount);
		}

		catch (e) {
			return PokerState.setUserDialogText(this.gameState,user,String(e));
		}

		if (this.gameState.state=="idle") {
			this.gameState=PokerState.checkStart(this.gameState);
			this.resetTimeout();
		}
	}

	async action(action, value) {
		this.timer.clearTimeout();

		this.gameState=PokerState.action(this.gameState,action,value);
		if (this.gameState.state=="idle") {
			await this.updateUserBalances(PokerUtil.getSeatedInUserChips(this.gameState));
			await this.cleanUpConnections();

			if (this.conf.status!="publish") {
				await this.exit();
				return;
			}

			this.gameState=PokerState.applyConfiguration(this.gameState,this.conf);
			this.gameState=PokerState.checkStart(this.gameState);
		}

		this.resetTimeout();
		this.presentToAll();
	}

	async cleanUpConnections() {
		let users=PokerUtil.getReservingUsers(this.gameState);
		for (let user of users) {
			if (!this.isUserConnected(user))
				this.gameState=PokerState.removeUser(this.gameState,user);
		}

		if (this.gameState.state=="idle") {
			let users=PokerUtil.getSeatedInUsers(this.gameState);
			for (let user of users) {
				if (!this.isUserConnected(user) ||
						!PokerUtil.getUserChips(this.gameState,user) ||
						PokerUtil.getUserSeatState(this.gameState,user)=="leave") {
					await this.removeUser(user);
					this.gameState=PokerState.removeUser(this.gameState,user);
				}
			}
		}
	}

	presentToAll() {
		for (let c of this.connections)
			this.presentToConnection(c);
	}

	presentToConnection(c) {
		let presented=PokerState.present(this.gameState,c.user,this.timer.getTimeLeft());
		c.send(JSON.stringify(presented));
	}

	resetTimeout() {
		this.timer.clearTimeout();

		let delay=PokerUtil.getTimeout(this.gameState);
		if (delay) {
			this.timer.setTimeout(delay);
			//console.log("delay: "+delay+" left: "+this.timer.getTimeLeft());
		}
	}

	async reloadConf() {
		await super.reloadConf();

		if (this.gameState.state=="idle") {
			this.gameState=PokerState.applyConfiguration(this.gameState,this.conf);

			if (this.conf.status!="publish") {
				await this.exit();
				return;
			}

			this.resetTimeout();
			this.presentToAll();
		}
	}
}
