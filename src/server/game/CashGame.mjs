import MoneyGame from "./MoneyGame.mjs";
import NumberUtil from "../../utils/NumberUtil.js";

import * as PokerState from "../../../src/server/poker/PokerState.mjs";
import * as PokerUtil from "../../../src/server/poker/PokerUtil.mjs";

export default class CashGame extends MoneyGame {
	constructor(conf, backend) {
		super(conf,backend);
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

	onTimeout=async ()=>{
		await this.action();
	}

	async connect(ws) {
		this.presentToConnection(ws);
	}

	async disconnect(ws) {
		await this.cleanUpConnections();
		this.presentToAll();

		await super.disconnect(ws);
	}

	async message(ws, message) {
		if (!ws.user)
			return;

		let nonSpeakerActions=[
			"seatJoin","dialogCancel","dialogOk",
			"leaveTable","leaveNextRound"
		];

		let isNonSpeakerAction=(nonSpeakerActions.indexOf(message.action)>=0);

		if (isNonSpeakerAction)
			await this.nonSpeakerAction(ws,message);

		else if (PokerUtil.isUserSpeaker(this.gameState,ws.user))
			return await this.action(message.action,message.value);
	}

	async nonSpeakerAction(ws, message) {
		switch (message.action) {
			case "seatJoin":
				this.gameState=PokerState.reserveSeat(this.gameState,message.seatIndex,ws.user);
				break;

			case "dialogCancel":
				this.gameState=PokerState.removeUser(this.gameState,ws.user);
				break;

			case "dialogOk":
				await this.sitInUser(ws.user,message.value);
				break;

			case "leaveTable":
				if (this.gameState.state=="idle") {
					await this.removeUser(user);
					this.gameState=PokerState.removeUser(this.gameState,ws.user);
				}
				break;

			case "leaveNextRound":
				this.gameState=PokerState.setUserAttr(
					this.gameState,
					ws.user,
					"leaveNextRound",
					message.value);
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
			this.gameState=PokerState.setUserDialogText(this.gameState,user,String(e));
		}

		if (this.gameState.state=="idle") {
			this.gameState=PokerState.checkStart(this.gameState);
			this.resetTimeout();
		}
	}

	async action(action, value) {
		this.clearAllTimeouts();

		this.gameState=PokerState.action(this.gameState,action,value);
		if (this.gameState.state=="idle") {
			await this.updateUserBalances(
				PokerUtil.getSeatedInUserChips(this.gameState),
				this.gameState.rake
			);

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
						PokerUtil.getUserSeatState(this.gameState,user)=="leave" ||
						PokerUtil.getUserAttr(this.gameState,user,"leaveNextRound")) {
					await this.removeUser(user);
					this.gameState=PokerState.removeUser(this.gameState,user);
				}
			}
		}
	}

	presentToAll() {
		for (let ws of this.connections)
			this.presentToConnection(ws);
	}

	presentToConnection(ws) {
		let timeLeft=this.getTimeLeft(this.gameTimeout);
		let presented=PokerState.present(this.gameState,ws.user,timeLeft);
		ws.send(presented);
	}

	resetTimeout() {
		this.clearAllTimeouts();
		this.gameTimeout=null;

		let delay=PokerUtil.getTimeout(this.gameState);
		if (delay)
			this.gameTimeout=this.setTimeout(this.onTimeout,delay);
	}

	async suspend() {
		if (this.gameState.state=="idle") {
			console.log("no need to suspend idle state, just clearing");
			await this.removeAllUsers();
			this.gameState=null;
		}
		await super.suspend();
	}

	async reloadConf() {
		await super.reloadConf();
		if (this.gameState.state=="idle") {
			this.gameState=PokerState.applyConfiguration(this.gameState,this.conf);

			if (this.conf.status!="publish") {
				await this.cleanExit();
				return;
			}

			this.resetTimeout();
			this.presentToAll();
		}
	}
}
