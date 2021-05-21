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

	it("can get stake by level",()=>{
		let t={
			stake: 2,
			//levelIncreaseBase: 1.3,
			levelIncreasePercent: 70
		};

		//console.log("");
		for (let i=0; i<20; i++) {
			let stake=TournamentUtil.getStakeByLevel(t,i);
			//console.log((i+1)+": "+stake);
		}
	});

	it("can get current blind level",()=>{
		let t=TournamentState.createTournamentState();

		expect(TournamentUtil.getStakeByLevel(t,0)).toEqual(2);
		expect(TournamentUtil.getStakeByLevel(t,1)).toEqual(4);
		expect(TournamentUtil.getStakeByLevel(t,2)).toEqual(6);

		t.tournamentTime=0;
		expect(TournamentUtil.getCurrentLevelIndex(t)).toEqual(0);

		t.tournamentTime=5*60000-1;
		expect(TournamentUtil.getCurrentLevelIndex(t)).toEqual(0);

		t.tournamentTime=5*60000;
		expect(TournamentUtil.getCurrentLevelIndex(t)).toEqual(1);

		t.tournamentTime=0;
		expect(TournamentUtil.getCurrentLevelTimeLeft(t)).toEqual(5*60000);

		t.tournamentTime=1;
		expect(TournamentUtil.getCurrentLevelTimeLeft(t)).toEqual(5*60000-1);

		t.tournamentTime=5*60000;
		expect(TournamentUtil.getCurrentLevelTimeLeft(t)).toEqual(5*60000);

		t.tournamentTime=0;
		expect(TournamentUtil.getCurrentStake(t)).toEqual(2);
	});
});