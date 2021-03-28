import EventEmitter from "events";
import AsyncState from "../../utils/AsyncState.mjs";
import Timer from "../../utils/Timer.js";
import ArrayUtil from "../../utils/ArrayUtil.js";

import * as TournamentState from "../../../src/server/poker/TournamentState.mjs";

export default class Tournament extends EventEmitter {
	constructor(id, backend) {
		super();

		this.id=id;
		this.backend=backend;
		this.connections=[];
		this.startTimer=new Timer();
		this.startTimer.on("timeout",this.onStartTimeout);
		this.tournamentState=new AsyncState();
		this.tournamentState.on("finalized",this.onTournamentStateFinalized);

		this.tournamentState.apply(async ()=>{
			console.log("Loading tournament: "+this.id);

			let data=await this.backend.fetch({
				call: "getTournament",
				tournamentId: this.id
			});

			if (data.runState=="running")
				throw new Error("Already running");

			let t;
			try {
				t=JSON.parse(data.tournamentState);
			}

			catch (e) {
				console.log("Tournament state not defined on load");
				if (data.status!="publish")
					throw new Error("Tournament not published");

				t=TournamentState.createTournamentState(data);
			}

			this.resetTimeouts(t);

			return t;
		});
	}

	addConnection(ws) {
		if (this.tournamentState.isFinalized()) {
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

		this.tournamentState.apply((t)=>{
			this.presentToConnection(t,ws);
			return t;
		});
	}

	onStartTimeout=()=>{
		this.startTimer.clearTimeout();
		console.log("starting the tournament!!!");
	}

	onDisconnect=(ws)=>{
		this.tournamentState.apply(async (t)=>{
			ArrayUtil.remove(this.connections,ws);

			if (!this.connections.length) {
				console.log("no more connections!");

				/*await this.backend.fetch({
					call: "saveCashGameTableState",
					tableId: this.id,
					tableState: JSON.stringify(t),
					runState: "suspended",
					numPlayers: PokerUtil.getNumUsers(t)
				});*/

				return null;
			}

			return t;
		});
	}

	onTournamentStateFinalized=()=>{
		for (let ws of this.connections)
			ws.close();

		this.connections=[];
		this.startTimer.clearTimeout();
		this.emit("done",this);
	}

	resetTimeouts(t) {
		switch (t.state) {
			case "registration":
				this.startTimer.setTimeoutAt(t.startTime);
				break;

			default:
				throw new Error("can't set timers: "+t.state);
		}
	}

	presentToConnection(t, connection) {
		let p;
		switch (t.state) {
			case "registration":
				p=TournamentState.presentRegistration(t,connection.user,this.startTimer.getTimeLeft());
				break;

			default:
				throw new Error("can't present this state: "+t.state);
		}

		connection.send(JSON.stringify(p));
	}

	onMessage=(c, message)=>{
		/*this.tableState.apply((t)=>{
			if (PokerUtil.isUserSpeaker(t,c.user))
				return this.action(t,message.action,message.value);

			else
				return this.nonSpeakerAction(t,c.user,message);
		});*/
	}
}