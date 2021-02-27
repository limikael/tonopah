const PokerState=require("../../../src/server/poker/PokerState");

describe("PokerState",()=>{
	it("can be created",()=>{
		let state=PokerState.createPokerState();
		expect(state.stake).toEqual(2);

		state=PokerState.createPokerState({
			stake: 4
		});
		expect(state.stake).toEqual(4);
	})
})