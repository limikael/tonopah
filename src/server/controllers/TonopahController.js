const TableController=require("./TableController");
const TableHelper=require("./TableHelper");
const ClassUtil=require("../../utils/ClassUtil");

class TonopahController {
	constructor(server) {
		this.server=server;
		this.timeoutManager=server.timeoutManager;

		ClassUtil.mixInClass(this,TableController);
		ClassUtil.mixInClass(this,TableHelper);
	}

	load=async (id)=>{
		//console.log("loading state: "+id);

		let seats=[];
		for (let i=0; i<10; i++)
			seats.push({
				user: "",
				cards: [],
				win: 0,
				potContrib: 0,
				chips: 0,
				bet: 0,
				state: "available"
			});

		return {
			type: "cashgame",
			id: id,
			seats: seats,
			state: "idle",
			stake: 2,
			minSitInAmount: 50,
			maxSitInAmount: 100,
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
		let userSeatIndex=this.getSeatIndexByUser(tableState,user);

		tableState.buttons=[];
		tableState.sliderMax=false;

		if (this.isUserSpeaker(tableState,user)) {
			switch (tableState.state) {
				case "askBlinds":
					tableState.buttons=[{
						action: "leave"
					},{
						action: "postBlind",
						label: this.getCurrentBlindLabel(tableState),
						value: tableState.stake/this.getCurrentBlindDivider(tableState)
					}];
					break;

				case "round":
					tableState.buttons=[{
						action: "fold"
					},{
						action: "call",
						label: this.getCallLabel(tableState),
						value: this.getCostToCall(tableState)
					},{
						action: "raise",
						label: this.getRaiseLabel(tableState),
						value: this.getMinRaiseTo(tableState)
					}];
					tableState.sliderMax=this.getMaxRaiseTo(tableState);
					break;

				case "showMuck":
					if (tableState.seats[tableState.speakerIndex].state!="show") {
						tableState.buttons=[{
							action: "muck"
						},{
							action: "show",
						}];
					}
					break;
			}
		}

		for (let i=0; i<10; i++) {
			if (i!=userSeatIndex && tableState.seats[i].state!="show") {
				for (let j=0; j<tableState.seats[i].cards.length; j++) {
					tableState.seats[i].cards[j]=-1;
				}
			}

			switch (tableState.seats[i].state) {
				case "available":
					if (tableState.seats[i].user)
						tableState.seats[i].chips="RESERVED";

					else
						tableState.seats[i].chips="";

					break;
			}
		}

		tableState.pots=[];
		tableState.pots[0]=0;
		for (let i=0; i<10; i++)
			tableState.pots[0]+=tableState.seats[i].potContrib;

		tableState.highlightCards=null;
		let isShowing=false;
		if (tableState.state=="showMuck") {
			if (tableState.seats[tableState.speakerIndex].state=="show") {
				isShowing=true;
				if (tableState.communityCards.length==5) {
					let hand=this.getSeatHand(tableState,tableState.speakerIndex);
					let communityCards=[];
					let seatCards=[];

					for (let i of hand.getUsedCardIndices())
						if (i<5)
							communityCards.push(i);

						else
							seatCards.push(i-5)

					tableState.highlightCards={
						communityCards: communityCards,
						seatCards: seatCards,
						text: hand.getScoreString()
					};
				}
			}
		}

		tableState.timeLeft=null;
		tableState.totalTime=null;
		if (this.timeoutManager.getTotalTime(tableState.id)) {
			if (["askBlinds","round","showMuck"].includes(tableState.state)) {
				if (!isShowing) {
					let totalTime=this.timeoutManager.getTotalTime(tableState.id);
					let timeLeft=this.timeoutManager.getTimeLeft(tableState.id);

					tableState.timeLeft=timeLeft;
					tableState.totalTime=totalTime;
				}
			}
		}

		tableState.dialogText=null;
		tableState.dialogValue=null;
		tableState.dialogButtons=[];
		if (userSeatIndex>=0 && tableState.seats[userSeatIndex].state=="available") {
			tableState.dialogText=
				"Welcome!\n"+
				"Minumum sit in amount is "+tableState.minSitInAmount+". "+
				"Maximum sit in amount is "+tableState.maxSitInAmount+".\n"+
				"How much do you want to bring?";

			tableState.dialogValue=tableState.minSitInAmount;
			tableState.dialogButtons=[{
				label: "cancel",
				action: "dialogCancel"
			},{
				label: "ok",
				action: "dialogOk"
			}];
		}

		tableState.infoText="";
		if (userSeatIndex<0) {
			tableState.infoText="Welcome! Click on a seat to join the game!";
		}

		else if (tableState.state=="idle" &&
				tableState.seats[userSeatIndex].state!="available") {
			tableState.infoText="Please wait for another player to join the game!";
		}


		return tableState;
	}

	message=(tableState, user, message)=> {
		if (this.isUserSpeaker(tableState,user))
			this.handleSpeakerAction(tableState,message.action,message.value);

		switch (message.action) {
			case "seatJoin":
				this.sitInUser(tableState,message.seatIndex,user);
				break;

			case "dialogOk":
				this.confirmSitInUser(tableState,user,message.value);
				break;

			case "dialogCancel":
				this.cancelSitInUser(tableState,user);
				break;
		}
	}

	timeout=(tableState)=>{
		this.handleTimeout(tableState);
	}

	disconnect=(tableState, user)=>{
		//console.log(tableState);
		if (tableState.state=="idle") {
			let seatIndex=this.getSeatIndexByUser(tableState,user);

			if (seatIndex>=0) {
				tableState.seats[seatIndex].user=null;
				tableState.seats[seatIndex].state="available";
			}
		}
	}
}

module.exports=TonopahController;