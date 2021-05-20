import * as TournamentState from "../../../src/server/poker/TournamentState.mjs";
import * as TournamentUtil from "../../../src/server/poker/TournamentUtil.mjs";

describe("TournamentUtil",()=>{
	it("can get user table index",()=>{
		let t=TournamentState.createTournamentState();

		for (let i=0; i<15; i++)
			t=TournamentState.addUser(t,"user"+i);

		t=TournamentState.startTournament(t);
		expect(t.tables.length).toEqual(2);

		expect(TournamentUtil.getTableIndexByUser(t,"user0")).toEqual(0);
		expect(TournamentUtil.getTableIndexByUser(t,"user1")).toEqual(1);
		expect(TournamentUtil.getTableIndexByUser(t,"noone")).toEqual(-1);

		t.tables[0]=null;

		expect(TournamentUtil.getTableIndexByUser(t,"user0")).toEqual(-1);
		expect(TournamentUtil.getTableIndexByUser(t,"user1")).toEqual(1);
	});

	it("can get blind level",()=>{
		let t={
			stake: 2,
			levelIncreaseBase: 1.3
		};

		//console.log("");
		for (let i=0; i<20; i++) {
			let stake=TournamentUtil.getStakeByLevel(t,i);
			//console.log((i+1)+": "+stake);
		}
	});
});
