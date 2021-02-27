import * as PokerState from "../../../src/server/poker/PokerState.mjs";
import * as PokerUtil from "../../../src/server/poker/PokerUtil.mjs";

describe("PokerState",()=>{
	it("can be created",()=>{
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
	});
})