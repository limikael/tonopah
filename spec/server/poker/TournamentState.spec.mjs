import * as TournamentState from "../../../src/server/poker/TournamentState.mjs";
import * as PokerUtil from "../../../src/server/poker/PokerUtil.mjs";
import * as PokerState from "../../../src/server/poker/PokerState.mjs";

describe("TournamentState",()=>{
	it("can be started",()=>{
		let t=TournamentState.createTournamentState();

		for (let i=0; i<15; i++)
			t=TournamentState.addUser(t,"user"+i);

		t=TournamentState.startTournament(t);
		expect(t.tables[0].state).toEqual("askBlinds");
		expect(t.tables.length).toEqual(2);
	});

	it("can move users",()=>{
		let t=TournamentState.createTournamentState();
		for (let i=0; i<15; i++)
			t=TournamentState.addUser(t,"user"+i);

		t=TournamentState.startTournament(t);
		t.tables[0].state="idle";

		expect(PokerUtil.getNumUsers(t.tables[0])).toEqual(8);
		expect(PokerUtil.getNumUsers(t.tables[1])).toEqual(7);

		//console.log(JSON.stringify(t,null,2));
		t=TournamentState.moveUserToTable(t,1,"user0");
		//console.log(JSON.stringify(t,null,2));

		expect(PokerUtil.getNumUsers(t.tables[0])).toEqual(7);
		expect(PokerUtil.getNumUsers(t.tables[1])).toEqual(8);

		expect(PokerUtil.getUserChips(t.tables[1],"user0")).toEqual(1000);
	});

	it("can break tabls",()=>{
		let t=TournamentState.createTournamentState();
		for (let i=0; i<30; i++)
			t=TournamentState.addUser(t,"user"+i);

		t=TournamentState.startTournament(t);
		t.tables[0].state="idle";
		t.tables[1].state="idle";
		t.tables[2].state="idle";

		for (let i=0; i<5; i++) {
			for (let j=0; j<3; j++) {
				t.tables[j]=PokerState.removeUser(t.tables[j],t.tables[j].seats[i].user);
			}
		}

		t=TournamentState.breakTable(t,1);
		//console.log(t.tables[0].seats);
		//console.log(t.tables[2].seats);
	});
});
