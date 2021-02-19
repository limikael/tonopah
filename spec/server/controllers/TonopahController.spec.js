const TonopahController=require("../../../src/server/controllers/TonopahController");

function sitInUser(controller, tableState, seatIndex, user, amount) {
	controller.message(tableState,user,{
		action: "seatJoin",
		seatIndex: seatIndex
	});

	controller.message(tableState,user,{
		action: "dialogOk",
		value: amount
	});
}

describe("TonopahController",()=>{
	it("can start a game",async ()=>{
		let mockServer={
			timeoutManager: {
				setTimeout: ()=>{},
				clearTimeout: ()=>{}
			}
		};

		let controller=new TonopahController(mockServer);
		let tableState=await controller.load(123);

		sitInUser(controller,tableState,4,"olle",100);
		sitInUser(controller,tableState,5,"kalle",100);

		expect(tableState.dealerIndex).toEqual(4);
		expect(tableState.state).toEqual("askBlinds");

		expect(controller.getCurrentBlindDivider(tableState)).toEqual(1);
		controller.handleSpeakerAction(tableState,"postBlind");
		expect(controller.getCurrentBlindDivider(tableState)).toEqual(2);
		controller.handleSpeakerAction(tableState,"postBlind");
		expect(tableState.state).toEqual("round");
		controller.handleSpeakerAction(tableState,"fold");
		expect(tableState.state).toEqual("showMuck");
		expect(tableState.seats[4].potContrib).toEqual(1);
		expect(tableState.seats[5].potContrib).toEqual(1);
		controller.handleSpeakerAction(tableState,"muck");

		//expect(controller.getUnfoldedPotContribs(tableState)).toEqual([1]);
		//expect(controller.getWinningSeatsForPotContrib(tableState,1)).toEqual([4]);

		//console.log(controller.getPayouts(tableState));

		expect(tableState.seats[4].chips).toEqual(101);
		expect(tableState.seats[5].chips).toEqual(99);
	});
});