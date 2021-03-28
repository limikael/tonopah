import EventEmitter from "events";
import AsyncState from "../../utils/AsyncState.mjs";

export default class Tournament extends EventEmitter {
	constructor(id, backend) {
		this.id=id;
		this.backend=backend;
		this.connections=[];
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

			return t;
		});
	}
}