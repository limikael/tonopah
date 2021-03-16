import * as TournamentState from "../../../src/server/poker/TournamentState.mjs";

describe("TournamentState",()=>{
	it("can be started",()=>{
		let t=TournamentState.createTournamentState();

		for (let i=0; i<15; i++)
			t=TournamentState.addUser(t,"user"+i);

		t=TournamentState.startTournament(t);
	});
});
