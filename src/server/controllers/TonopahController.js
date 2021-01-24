const TableController=require("./TableController");
const TableHelper=require("./TableHelper");
const ClassUtil=require("../../utils/ClassUtil");

class TonopahController {
	constructor(server) {
		this.server=server;

		ClassUtil.mixInClass(this,TableController);
		ClassUtil.mixInClass(this,TableHelper);
	}

	load=async (id)=>{
		console.log("loading state: "+id);

		let seats=[];
		for (let i=0; i<10; i++)
			seats.push({
				user: "",
				cards: []
			});

		return {
			type: "cashgame",
			id: id,
			seats: seats,
			state: "idle",
			stake: 2,
			communityCards: [],
			dealerIndex: -1
		};
	}

	authenticate=async (token)=>{
		switch (token) {
			case "user1":
				return "Olle";

			case "user2":
				return "Kalle";

			case "user3":
				return "Pelle";

			case "user4":
				return "Lisa";
		}
	}

	present=(tableState, user)=> {
		//console.log("s: "+this.getSeatIndexByUser(tableState,user)+" sp: "+tableState.seatIndexToSpeak);

		let userSeatIndex=this.getSeatIndexByUser(tableState,user);

		tableState.buttons=[];
		tableState.sliderMax=false;

		if (this.isUserSpeaker(tableState,user)) {
			switch (tableState.state) {
				case "askBlinds":
					tableState.buttons=[{
						action: "postBlind",
						value: tableState.stake
					}];
					break;

				case "round":
					let raiseLabel="bet"
					if (this.getHighestBet(tableState))
						raiseLabel="raise";

					let callLabel="check";
					if (this.getCostToCall(tableState))
						callLabel="call";

					tableState.buttons=[{
						action: "fold"
					},{
						action: "call",
						label: callLabel,
						value: this.getCostToCall(tableState)
					},{
						action: "raise",
						label: raiseLabel,
						value: this.getMinRaiseTo(tableState)
					}];
					tableState.sliderMax=this.getMaxRaiseTo(tableState);
					break;
			}
		}

		for (let i=0; i<10; i++) {
			if (i!=userSeatIndex && !tableState.seats[i].show) {
				for (let j=0; j<tableState.seats[i].cards.length; j++) {
					tableState.seats[i].cards[j]=-1;
				}
			}
		}

		tableState.pots=[];
		tableState.pots[0]=0;
		for (let i=0; i<10; i++)
			tableState.pots[0]+=tableState.seats[i].potContrib;

		if (tableState.state=="showMuck") {
			if (tableState.seats[tableState.speakerIndex].show) {
				let hand=this.getSeatHand(tableState,tableState.speakerIndex);
				let communityCards=[];
				let seatCards=[];

				for (let i of hand.getUsedCardIndices())
					if (i<5)
						communityCards.push(i);

					else
						seatCards.push(i-5)

				tableState.highlightCards={
					seatIndex: tableState.speakerIndex,
					communityCards: communityCards,
					seatCards: seatCards,
					text: hand.getScoreString()
				};
			}
		}

		else
			tableState.highlightCards=null;

		return tableState;
	}

	message=(tableState, user, message)=> {
		if (this.isUserSpeaker(tableState,user))
			this.handleSpeakerAction(tableState,message.action,message.value);

		switch (message.action) {
			case "seatJoin":
				this.sitInUser(tableState,message.seatIndex,user);
				break;
		}
	}
}

module.exports=TonopahController;