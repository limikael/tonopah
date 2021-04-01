import EventEmitter from "events";
import MoneyGame from "./MoneyGame.mjs";
import Timer from "../../utils/Timer.js";

import * as TournamentState from "../../../src/server/poker/TournamentState.mjs";
import * as PokerUtil from "../../../src/server/poker/PokerUtil.mjs";

export default class Tournament extends MoneyGame {
	constructor(id, backend) {
		super("tournament",id,backend);

		this.startTimer=new Timer();
		this.startTimer.on("timeout",this.onStartTimeout);
		this.tableTimers=[];

		this.on("message",this.onMessage);
		this.on("connect",this.onConnect);
		this.on("finalize",this.onFinalize);

		this.reduce((t)=>{
			if (!t) {
				console.log("no suspended tournament state, creating new");
				t=TournamentState.createTournamentState(this.conf);
			}

			if (t.state=="idle")
				return this.enterIdleState(t);

			this.resetTimeouts(t);

			return t;
		});
	}

	onFinalize=()=>{
		this.startTimer.clearTimeout();
	}

	onConnect=(c)=>{
		this.reduce((t)=>{
			this.presentToConnection(t,c);
			return t;
		});
	}

	onStartTimeout=()=>{
		this.reduce((t)=>{
			console.log("starting the tournament!!!");

			t=TournamentState.startTournament(t);
			this.resetTimeouts(t);
			this.presentToAll(t);
			return t;
		});
	}

	onTableTimeout=(ti)=>{
		this.reduce((t)=>{
			t=TournamentState.tableAction(t,ti);

			let timeout=PokerUtil.getTimeout(t.tables[ti]);
			if (timeout)
				this.tableTimers[ti].setTimeout(timeout);

			this.presentToAll(t);

			return t;
		});
	}

	onMessage=(user, message)=>{
		if (!user)
			return;

		this.reduce(async (t)=>{
			switch (t.state) {
				case "registration":
					switch (message.action) {
						case "joinTournament":
							await this.addUser(user,t.fee);
							t=TournamentState.addUser(t,user);
							this.presentToAll(t);
							break;

						case "cancelRegistration":
							await this.removeUser(user);
							t=TournamentState.removeUser(t,user);
							this.presentToAll(t);
							break;
					}
					break;

				case "playing":
					throw new Error("not impl");
					/*if (PokerUtil.isUserSpeaker(t,c.user))
						return this.action(t,message.action,message.value);

					else
						return this.nonSpeakerAction(t,c.user,message);*/
					break;
			}

			return t;
		});
	}

	resetTimeouts(t) {
		this.createTableTimers(t);

		this.startTimer.clearTimeout();
		for (let tableTimer of this.tableTimers)
			tableTimer.clearTimeout();

		switch (t.state) {
			case "registration":
				this.startTimer.setTimeoutAt(t.startTime);
				break;

			case "playing":
				for (let ti=0; ti<t.tables.length; ti++) {
					if (t.tables[ti]) {
						let timeout=PokerUtil.getTimeout(t.tables[ti]);

						if (timeout)
							this.tableTimers[ti].setTimeout(timeout);
					}
				}
				break;

			default:
				throw new Error("can't set timers: "+t.state);
		}
	}

	createTableTimers(t) {
		for (let i=0; i<t.tables.length; i++)
			if (!this.tableTimers[i]) {
				let timer=new Timer();
				timer.on("timeout",this.onTableTimeout.bind(this,i));
				this.tableTimers[i]=timer;
			}
	}

	presentToConnection(t, connection) {
		let p;
		switch (t.state) {
			case "registration":
				p=TournamentState.presentRegistration(t,connection.user,this.startTimer.getTimeLeft());
				break;

			case "playing":
				let timeLefts=this.tableTimers.map(timer=>timer.getTimeLeft());
				p=TournamentState.presentPlaying(t,connection.user,timeLefts);
				break;

			default:
				throw new Error("can't present this state: "+t.state);
		}

		connection.send(JSON.stringify(p));
	}

	presentToAll(t) {
		for (let connection of this.connections)
			this.presentToConnection(t,connection);
	}
}