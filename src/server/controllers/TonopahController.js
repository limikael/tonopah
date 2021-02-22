const TableController=require("./TableController");
const TableHelper=require("./TableHelper");
const ClassUtil=require("../../utils/ClassUtil");

class TonopahController {
	constructor(server) {
		this.server=server;
		this.backend=server.backend;
		this.timeoutManager=server.timeoutManager;

		ClassUtil.mixInClass(this,TableController);
		ClassUtil.mixInClass(this,TableHelper);
	}

	createNewTableState(id) {
		let tableState={
			id: id,
			seats: [],
			communityCards: [],
			dealerIndex: -1,
			state: "idle"
		};

		for (let i=0; i<10; i++)
			tableState.seats.push({
				user: "",
				cards: [],
				win: 0,
				potContrib: 0,
				chips: 0,
				bet: 0,
				state: "available"
			});

		return tableState;
	}

	applyTableSateConfiguration(tableState, data) {
		tableState.stake=data.stake;
		tableState.minSitInAmount=data.minSitInAmount;
		tableState.maxSitInAmount=data.maxSitInAmount;
		tableState.currency=data.currency;
	}

	load=async (id)=>{
		let data=await this.backend.fetch({
			call: "getCashGame",
			tableId: id
		});

		if (data.runState=="running") {
			console.error("Table is already running: "+id);
			throw new Error("Already running");
		}

		let tableState;
		try {
			tableState=JSON.parse(data.tableState);
		}

		catch (e) {
			//console.log("Table state not defined on load");
		}

		if (!tableState)
			tableState=this.createNewTableState(id);

		if (tableState.state=="idle") {
			this.applyTableSateConfiguration(tableState,data);
			this.checkStart(tableState);
		}

		await this.saveRunningTableState(tableState);

		if (tableState.state!="idle") {
			let t=30000;

			switch (tableState.state) {
				case "askBlinds":
				case "round":
					break;

				case "showMuck":
					t=5000;
					break;

				case "payout":
				case "finished":
					t=1000;
					break;
			}

			this.timeoutManager.setTimeout(tableState.id,t);
		}

		return tableState;
	}

	async saveRunningTableState(tableState) {
		await this.backend.fetch({
			call: "saveCashGameTableState",
			tableId: tableState.id,
			tableState: JSON.stringify(tableState),
			runState: "running"
		});
	}

	suspend=async (tableState)=>{
		this.timeoutManager.clearTimeout(tableState.id);

		await this.backend.fetch({
			call: "saveCashGameTableState",
			tableId: tableState.id,
			tableState: JSON.stringify(tableState),
			runState: "suspended"
		});
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

	message=async (tableState, user, message)=> {
		if (this.isUserSpeaker(tableState,user))
			await this.handleSpeakerAction(tableState,message.action,message.value);

		switch (message.action) {
			case "seatJoin":
				await this.sitInUser(tableState,message.seatIndex,user);
				break;

			case "dialogOk":
				await this.confirmSitInUser(tableState,user,message.value);
				break;

			case "dialogCancel":
				await this.cancelSitInUser(tableState,user);
				break;
		}
	}

	timeout=async (tableState)=>{
		await this.handleTimeout(tableState);
	}

	disconnect=async (tableState, user)=>{
		if (this.server.isUserConnected(tableState.id,user))
			return;

		if (tableState.state=="idle") {
			let seatIndex=this.getSeatIndexByUser(tableState,user);
			if (seatIndex>=0)
				await this.removeUserFromSeat(tableState,seatIndex);
		}
	}
}

module.exports=TonopahController;