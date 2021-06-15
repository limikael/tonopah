import MoneyGame from "./MoneyGame.mjs";
import Timer from "../utils/Timer.js";

import * as TournamentState from "../poker/TournamentState.mjs";
import * as TournamentUtil from "../poker/TournamentUtil.mjs";
import * as PokerUtil from "../poker/PokerUtil.mjs";

export default class Tournament extends MoneyGame {
	constructor(conf, backend) {
		super(conf,backend);

		this.tableTimers=[];
	}

	async init() {
		if (!this.gameState) {
			console.log("no suspended tournament state, creating new");
			this.gameState=TournamentState.createTournamentState(this.conf);
		}

		this.gameState=TournamentState.applyConfiguration(this.gameState,this.conf);
		this.loadTime=Date.now();
		this.loadTournamentTime=this.gameState.tournamentTime;
		this.resetTimeouts();
	}


	async connect(ws) {
		this.presentToConnection(ws);
	}

	onStartTimeout=async ()=>{
		if (this.gameState.users.length<this.gameState.minPlayers) {
			console.log("canceling tournament, too few players at start")
			this.gameState=TournamentState.cancelTournament(this.gameState);
			await this.removeAllUsers();
			await this.saveGameState();
			this.presentToAll();
		}

		else {
			console.log("starting the tournament!!!");

			this.gameState=TournamentState.startTournament(this.gameState);
			this.loadTime=Date.now();
			this.loadTournamentTime=this.gameState.tournamentTime;
			this.resetTimeouts();
			this.presentToAll();
		}
	}

	onTableTimeout=async (ti)=>{
		await this.tableAction(ti);
	}

	async message(ws, message) {
		if (!ws.user)
			return;

		switch (this.gameState.state) {
			case "registration":
				switch (message.action) {
					case "joinTournament":
						try {
							await this.addUser(ws.user,this.gameState.fee+this.gameState.rakeFee);
							this.gameState=TournamentState.addUser(this.gameState,user);
						}

						catch (e) {
							console.log(e);
							this.gameState=TournamentState.setUserDialogText(this.gameState,ws.user,e.message);
						}

						this.presentToAll();
						break;

					case "cancelRegistration":
						await this.removeUser(user);
						this.gameState=TournamentState.removeUser(this.gameState,ws.user);
						this.presentToAll();
						break;

					case "dialogCancel":
						this.gameState=TournamentState.removeUserDialog(this.gameState,ws.user);
						this.presentToAll();
						break;
				}
				break;

			case "playing":
				let ti=TournamentUtil.getTableIndexByUser(this.gameState,ws.user);
				if (ti<0)
					return;

				if (!PokerUtil.isUserSpeaker(this.gameState.tables[ti],ws.user))
					return;

				await this.tableAction(ti,message.action,message.value);
				break;
		}
	}

	async tableAction(ti, action, value) {
		this.updateTournamentTime();
		this.gameState=TournamentState.tableAction(this.gameState,ti,action,value);
		this.resetTableTimeout(ti);

		if (this.gameState.state=="finished") {
			console.log("Tournament finished!");
			await this.updateUserBalances(
				TournamentUtil.getPayouts(this.gameState),
				TournamentUtil.getRake(this.gameState));

			await this.removeAllUsers();
			await this.saveGameState();
		}

		this.presentToAll();
	}

	resetTableTimeout(ti) {
		if (ti<0)
			throw new Error("reset table timeout for negative index");

		if (!this.tableTimers[ti]) {
			let timer=new Timer(this.mainLoop);
			timer.on("timeout",this.onTableTimeout.bind(this,ti));
			this.tableTimers[ti]=timer;
		}

		this.tableTimers[ti].clearTimeout();
		if (this.gameState.tables[ti]) {
			let timeout=PokerUtil.getTimeout(this.gameState.tables[ti]);

			if (timeout)
				this.tableTimers[ti].setTimeout(timeout);
		}
	}

	resetTimeouts() {
		this.clearAllTimeouts();

		switch (this.gameState.state) {
			case "registration":
				this.startTimer.setTimeoutAt(this.gameState.startTime);
				break;

			case "playing":
				for (let ti=0; ti<this.gameState.tables.length; ti++)
					this.resetTableTimeout(ti);

				break;

			case "finished":
			case "canceled":
				break;

			default:
				throw new Error("can't set timers: "+this.gameState.state);
				break;
		}
	}

	presentToConnection(ws) {
		this.updateTournamentTime();

		let p;
		switch (this.gameState.state) {
			case "registration":
				p=TournamentState.presentRegistration(
					this.gameState,
					ws.user,
					this.startTimer.getTimeLeft()
				);
				break;

			case "playing":
				let timeLefts=this.tableTimers.map(timer=>timer.getTimeLeft());
				p=TournamentState.presentPlaying(this.gameState,ws.user,timeLefts);
				break;

			case "finished":
				p=TournamentState.presentFinished(this.gameState,ws.user);
				break;

			case "canceled":
				p=TournamentState.presentCanceled(this.gameState,ws.user);
				break;

			default:
				throw new Error("can't present this state: "+this.gameState.state);
		}

		ws.send(p);
	}

	presentToAll() {
		for (let ws of this.connections)
			this.presentToConnection(ws);
	}

	updateTournamentTime() {
		if (this.gameState.state!="playing")
			return;

		let time=this.loadTournamentTime+Date.now()-this.loadTime;
		this.gameState=TournamentState.setTournamentTime(this.gameState,time);
	}

	async suspend() {
		this.updateTournamentTime();
		await super.suspend();
	}

	async reloadConf() {
		await super.reloadConf();
		this.gameState=TournamentState.applyConfiguration(this.gameState,this.conf);

		this.resetTimeouts();
		this.presentToAll();
	}
}