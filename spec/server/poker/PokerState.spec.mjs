import * as PokerState from "../../../src/server/poker/PokerState.mjs";
import * as PokerUtil from "../../../src/server/poker/PokerUtil.mjs";

describe("PokerState",()=>{
	it("can play",()=>{
		let table=PokerState.createPokerState();
		expect(table.stake).toEqual(2);

		table=PokerState.sitInUser(table,0,"kalle",100);
		table=PokerState.sitInUser(table,1,"olle",100);

		expect(PokerUtil.getNumSeatsByState(table,"gameOver")).toEqual(2);
		table=PokerState.startGame(table,[12,0,25,1,5,16,20,34,35]);

		expect(table.state).toEqual("askBlinds");
		expect(PokerUtil.getSpeakerUser(table)).toEqual("olle");

		table=PokerState.action(table,"postBlind");
		table=PokerState.action(table,"postBlind");

		//console.log(table.seats[0].cards);

		expect(table.state).toEqual("round");
		expect(PokerUtil.getPots(table)).toEqual([0]);

		table=PokerState.action(table,"call");
		table=PokerState.action(table,"call");
		expect(PokerUtil.getPots(table)).toEqual([4]);

		table=PokerState.action(table,"call");
		table=PokerState.action(table,"call");
		table=PokerState.action(table,"call");
		table=PokerState.action(table,"call");
		table=PokerState.action(table,"call");
		table=PokerState.action(table,"call");
		expect(table.state).toEqual("showMuck");

		table=PokerState.action(table);
		table=PokerState.action(table);
		expect(table.state).toEqual("payout");

		table=PokerState.action(table);
		expect(table.state).toEqual("finished");

		table=PokerState.action(table);
		expect(table.state).toEqual("idle");

		expect(PokerUtil.getSeatedInUserChips(table)).toEqual({ kalle: 102, olle: 98 });
	});

	it("returns excessive bets",()=>{
		let table=PokerState.createPokerState();
		expect(table.stake).toEqual(2);

		table=PokerState.sitInUser(table,0,"kalle",10);
		table=PokerState.sitInUser(table,1,"olle",20);
		table=PokerState.startGame(table,[12,0,25,1,5,16,20,34,35]);

		table=PokerState.action(table,"postBlind");
		table=PokerState.action(table,"postBlind");
		table=PokerState.action(table,"call");
		table=PokerState.action(table,"call");

		table=PokerState.action(table,"raise",PokerUtil.getMaxRaiseTo(table));
		//console.log("now it gets interesting: "+PokerUtil.getCostToCall(table));
		table=PokerState.action(table,"call");

		expect(PokerUtil.getPots(table)).toEqual([20]);
	});

	it("reserve and sit in",()=>{
		let t=PokerState.createPokerState();
		t=PokerState.reserveSeat(t,5,"testson");
		t=PokerState.sitInUser(t,2,"testson",100);
		expect(t.seats[5].user).toEqual(null);
		expect(t.seats[2].user).toEqual("testson");

		t=PokerState.createPokerState();
		t=PokerState.reserveSeat(t,3,"testson");
		t=PokerState.sitInUser(t,3,"testson",100);
		expect(t.seats[3].user).toEqual("testson");
		expect(t.seats[3].chips).toEqual(100);

		t=PokerState.createPokerState();
		t=PokerState.sitInUser(t,7,"testson",100);
		expect(t.seats[7].user).toEqual("testson");
		expect(t.seats[7].chips).toEqual(100);
	});

	it("can take rake",()=>{
		let table=PokerState.createPokerState({
			stake: 100,
			rakeStep: 10,
			rakePercent: 5
		});
		table=PokerState.sitInUser(table,0,"kalle",1000);
		table=PokerState.sitInUser(table,1,"olle",1000);
		table=PokerState.startGame(table,[12,0,25,1,5,16,20,34,35]);
		table=PokerState.action(table,"postBlind");
		table=PokerState.action(table,"postBlind");

		table=PokerState.action(table,"raise",50);
		table=PokerState.action(table,"call");

		while (table.state!="idle")
			table=PokerState.action(table);

		expect(PokerUtil.getSeatedInUserChips(table)).toEqual({ kalle: 1180, olle: 800 });
		expect(table.rake).toEqual(20);
	});
});
