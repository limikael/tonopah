const TableController=require("./TableController");
const ClassUtil=require("../../utils/ClassUtil");

class TonopahController {
	constructor(server) {
		this.server=server;

		ClassUtil.mixInClass(this,TableController);
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

		if (tableState.speakerIndex>=0 && 
				tableState.speakerIndex==userSeatIndex) {
			switch (tableState.state) {
				case "askBlinds":
					tableState.buttons=[{
						action: "postBlind",
						value: tableState.stake
					}];
					break;

				case "round":
					tableState.buttons=[{
						action: "fold"
					},{
						action: "call",
						value: this.getCostToCall(tableState,userSeatIndex)
					},{
						action: "raise"
					}];
					break;
			}
		}

		for (let i=0; i<10; i++) {
			if (i!=userSeatIndex) {
				for (let j=0; j<tableState.seats[i].cards.length; j++) {
					tableState.seats[i].cards[j]=-1;
				}
			}
		}

		tableState.pots=[];
		tableState.pots[0]=0;
		for (let i=0; i<10; i++)
			tableState.pots[0]+=tableState.seats[i].potContrib;

		return tableState;
	}

	message=(tableState, user, message)=> {
		switch (message.action) {
			case "seatJoin":
				this.sitInUser(tableState,message.seatIndex,user);
				break;

			case "postBlind":
				this.makeBetForSpeaker(tableState,tableState.stake);
				this.advanceSpeaker(tableState);
				if (this.getNumSeatsWithBets(tableState)>=2)
					this.nextRound(tableState);
				break;

			case "fold":
			case "call":
			case "raise":
				this.roundAction(tableState,message.action,message.value);
		}
	}
}

module.exports=TonopahController;