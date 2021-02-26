const TonopahController=require("../../../src/server/controllers/TonopahController");
const MockBackend=require("../../../src/server/app/MockBackend");

async function sitInUser(controller, tableState, seatIndex, user, amount) {
	await controller.message(tableState,user,{
		action: "seatJoin",
		seatIndex: seatIndex
	});

	await controller.message(tableState,user,{
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
			},
			backend: new MockBackend({log: false})
		};

		let controller=new TonopahController(mockServer);
		let tableState=await controller.load(123);

		await sitInUser(controller,tableState,4,"olle",100);
		await sitInUser(controller,tableState,5,"kalle",100);

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

		expect(tableState.seats[4].chips).toEqual(101);
		expect(tableState.seats[5].chips).toEqual(99);
	});
});

describe("TonopahController",()=>{
	it("has the correct buttons",async ()=>{
		let mockServer={
			timeoutManager: {
				getTotalTime: ()=>30000,
				getTimeLeft: ()=>30000,
				setTimeout: ()=>{},
				clearTimeout: ()=>{}
			},
			backend: new MockBackend({log: false})
		};

		let controller=new TonopahController(mockServer);
		let tableState=await controller.load(123);

		await sitInUser(controller,tableState,4,"olle",10);
		await sitInUser(controller,tableState,5,"kalle",10);

		expect(tableState.dealerIndex).toEqual(4);
		expect(tableState.state).toEqual("askBlinds");

		expect(controller.getCurrentBlindDivider(tableState)).toEqual(1);
		controller.handleSpeakerAction(tableState,"postBlind");
		expect(controller.getCurrentBlindDivider(tableState)).toEqual(2);
		controller.handleSpeakerAction(tableState,"postBlind");
		expect(tableState.state).toEqual("round");
		controller.handleSpeakerAction(tableState,"call");
		controller.handleSpeakerAction(tableState,"call");

		expect(controller.getPots(tableState)).toEqual([4]);

		controller.handleSpeakerAction(tableState,"raise",100);

		expect(controller.canRaise(tableState)).toEqual(false);

		let presented=controller.present(tableState,"olle")
		expect(presented.buttons.length).toEqual(2);
	});
});