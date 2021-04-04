import * as TournamentState from "../../../src/server/poker/TournamentState.mjs";
import * as TournamentUtil from "../../../src/server/poker/TournamentUtil.mjs";
import * as PokerUtil from "../../../src/server/poker/PokerUtil.mjs";
import * as PokerState from "../../../src/server/poker/PokerState.mjs";

import ArrayUtil from "../../../src/utils/ArrayUtil.js";

describe("TournamentState",()=>{
	it("can be started",()=>{
		let t=TournamentState.createTournamentState();

		for (let i=0; i<15; i++)
			t=TournamentState.addUser(t,"user"+i);

		t=TournamentState.startTournament(t);
		t=TournamentState.tableAction(t,0);
		expect(t.tables[0].state).toEqual("round");
		expect(t.tables.length).toEqual(2);
	});

	it("can not start if too few players",()=>{
		let t=TournamentState.createTournamentState();

		expect(()=>{
			t=TournamentState.startTournament(t);
		}).toThrow();
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
		expect(PokerUtil.getNumUsers(t.tables[0])).toEqual(8);
		expect(PokerUtil.getNumUsers(t.tables[2])).toEqual(7);
	});

	it("can play a tournament",()=>{
		let t=TournamentState.createTournamentState();
		for (let i=0; i<30; i++)
			t=TournamentState.addUser(t,"user"+i);

		t.startChips=40;
		t=TournamentState.startTournament(t);

		while (t.state!="finished") {
			for (let i=0; i<t.tables.length; i++) {
				if (t.tables[i]) {
					let actions=PokerUtil.getAvailableActions(t.tables[i]);
					actions.reverse();
					let action=actions[0];
					let value;

					if (action=="raise")
						value=PokerUtil.getMaxRaiseTo(t.tables[i]);

					//let s=t.tables[i].state;
					t=TournamentState.tableAction(t,i,action,value);
				}
			}
		}

		//console.log(TournamentUtil.getWinners(t));
	});
});
