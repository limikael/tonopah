import MoneyGame from "./MoneyGame.mjs";
import Timer from "../../utils/Timer.js";

import * as TournamentState from "../poker/TournamentState.mjs";
import * as TournamentUtil from "../poker/TournamentUtil.mjs";
import * as PokerUtil from "../poker/PokerUtil.mjs";

export default class Tournament extends MoneyGame {
	constructor(conf, backend, mainLoop) {
		super(conf,backend,mainLoop);

		this.startTimer=new Timer();
		this.startTimer.on("timeout",this.onStartTimeout);
		this.tableTimers=[];
	}

	async init() {
		if (!this.gameState) {
			console.log("no suspended tournament state, creating new");
			this.gameState=TournamentState.createTournamentState(this.conf);
		}

		this.resetTimeouts();
	}

	finalize() {
		this.startTimer.clearTimeout();

		for (let tableTimer of this.tableTimers)
			tableTimer.clearTimeout();
	}

	async addConnection(c) {
		await super.addConnection(c);
		this.presentToConnection(c);
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
			this.resetTimeouts();
			this.presentToAll();
		}
	}

	onTableTimeout=async (ti)=>{
		await this.tableAction(ti);
	}

	handleMessage=async (user, message)=>{
		if (!user)
			return;

		switch (this.gameState.state) {
			case "registration":
				switch (message.action) {
					case "joinTournament":
						await this.addUser(user,this.gameState.fee);
						this.gameState=TournamentState.addUser(this.gameState,user);
						this.presentToAll();
						break;

					case "cancelRegistration":
						await this.removeUser(user);
						this.gameState=TournamentState.removeUser(this.gameState,user);
						this.presentToAll(this.gameState);
						break;
				}
				break;

			case "playing":
				let ti=TournamentUtil.getTableIndexByUser(this.gameState,user);
				if (ti<0)
					return;

				if (!PokerUtil.isUserSpeaker(this.gameState.tables[ti],user))
					return;

				await this.tableAction(ti,message.action,message.value);
				break;
		}
	}

	async tableAction(ti, action, value) {
		this.gameState=TournamentState.tableAction(this.gameState,ti,action,value);
		this.resetTableTimeout(ti);

		if (this.gameState.state=="finished") {
			console.log("Tournament finished!");
			await this.updateUserBalances(TournamentUtil.getPayouts(this.gameState));
			await this.removeAllUsers();
			await this.saveGameState();
		}

		this.presentToAll();
	}

	resetTableTimeout(ti) {
		if (ti<0)
			throw new Error("reset table timeout for negative index");

		if (!this.tableTimers[ti]) {
			let timer=new Timer();
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
		this.startTimer.clearTimeout();

		for (let tableTimer of this.tableTimers)
			tableTimer.clearTimeout();

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

	presentToConnection(connection) {
		let p;
		switch (this.gameState.state) {
			case "registration":
				p=TournamentState.presentRegistration(
					this.gameState,
					connection.user,
					this.startTimer.getTimeLeft()
				);
				break;

			case "playing":
				let timeLefts=this.tableTimers.map(timer=>timer.getTimeLeft());
				p=TournamentState.presentPlaying(this.gameState,connection.user,timeLefts);
				break;

			case "finished":
				p=TournamentState.presentFinished(this.gameState,connection.user);
				break;

			case "canceled":
				p=TournamentState.presentCanceled(this.gameState,connection.user);
				break;

			default:
				throw new Error("can't present this state: "+this.gameState.state);
		}

		connection.send(JSON.stringify(p));
	}

	presentToAll() {
		for (let connection of this.connections)
			this.presentToConnection(connection);
	}
}