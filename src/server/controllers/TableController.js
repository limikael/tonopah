const ArrayUtil=require("../../utils/ArrayUtil");
const Hand=require("../../data/Hand.js");

class TableController {

	sitInUser(tableState, seatIndex, user) {
		if (!tableState.seats[seatIndex].user &&
				tableState.seats[seatIndex].state=="available" &&
				!this.isUserSeatedAtTable(tableState,user)) {
			tableState.seats[seatIndex].user=user;
		}
	}

	confirmSitInUser(tableState, user, amount) {
		let seatIndex=this.getSeatIndexByUser(tableState,user);
		if (seatIndex<0)
			return;

		if (tableState.seats[seatIndex].state!="available")
			return;

		tableState.seats[seatIndex].chips=amount;
		tableState.seats[seatIndex].state="gameOver";
		this.checkStart(tableState);
	}

	cancelSitInUser(tableState, user) {
		let seatIndex=this.getSeatIndexByUser(tableState,user);
		if (seatIndex<0)
			return;

		if (tableState.seats[seatIndex].state!="available")
			return;

		tableState.seats[seatIndex].user=null;
	}

	checkStart(tableState) {
		if (tableState.state=="idle" &&
				this.getNumSeatsByState(tableState,"gameOver")>=2)
			this.startGame(tableState);
	}

	startGame(tableState) {
		for (let i=0; i<10; i++) {
			tableState.seats[i].bet=0;

			if (tableState.seats[i].state=="gameOver")
				tableState.seats[i].state="playing";

			tableState.seats[i].cards=[];
			tableState.seats[i].potContrib=0;
		}

		tableState.communityCards=[];
		tableState.deck=ArrayUtil.shuffle(ArrayUtil.range(52));
		//tableState.deck=[10,1,20,30,40,2,50,5,14,15,5,21,22,23,24,25];

		this.advanceDealer(tableState);
		tableState.speakerIndex=this.getNextSeatByState(tableState,tableState.dealerIndex,"playing");
		tableState.state="askBlinds";
		this.stateServer.setTimeout(tableState.id,30000);
	}

	advanceDealer(tableState) {
		tableState.dealerIndex=
			this.getNextSeatByState(
				tableState,
				tableState.dealerIndex,
				"playing"
			);
	}

	advanceSpeaker(tableState) {
		tableState.speakerIndex=
			this.getNextSeatByState(
				tableState,
				tableState.speakerIndex,
				"playing"
			);
	}

	makeBetForSpeaker(tableState, amount) {
		tableState.seats[tableState.speakerIndex].chips-=amount;
		tableState.seats[tableState.speakerIndex].bet+=amount;
	}

	dealPocketCards(tableState) {
		for (let c=0; c<2; c++)	{
			for (let i=0; i<10; i++) {
				if (tableState.seats[i].state=="playing") {
					tableState.seats[i].cards.push(this.nextCard(tableState));
				}
			}
		}
	}

	dealCommunityCards(tableState) {
		let numCards=1;
		if (!tableState.communityCards.length)
			numCards=3;

		for (let i=0; i<numCards; i++)
			tableState.communityCards.push(this.nextCard(tableState));
	}

	nextCard(tableState) {
		return tableState.deck.shift();
	}

	nextShowMuck(tableState) {
		tableState.state="showMuck";
		if (!this.getNumSeatsByState(tableState,"playing")) {
			this.doPayouts(tableState);
			return;
		}

		tableState.speakerIndex=this.getNextSeatByState(tableState,tableState.dealerIndex,"playing");

		if (this.mustShow(tableState,tableState.speakerIndex)) {
			tableState.seats[tableState.speakerIndex].state="show";
			this.stateServer.setTimeout(tableState.id,5000);
		}

		else {
			this.stateServer.setTimeout(tableState.id,10000);
		}
	}

	doPayouts(tableState) {
		tableState.state="payout";
		this.stateServer.setTimeout(tableState.id,2000);
	}

	finishGame(tableState) {
		tableState.state="finished";
		tableState.communityCards=[];
		for (let i=0; i<10; i++) {
			tableState.seats[i].bet=0;
			tableState.seats[i].potContrib=0;
			tableState.seats[i].cards=[];

			if (tableState.seats[i].state=="playing" ||
					tableState.seats[i].state=="show" ||
					tableState.seats[i].state=="muck")
				tableState.seats[i].state="gameOver";

			if (!this.stateServer.isUserConnected(tableState.id,tableState.seats[i].user)) {
				tableState.seats[i].user=null;
				tableState.seats[i].state="available";
			}
		}
		this.stateServer.setTimeout(tableState.id,1000);
	}

	finishWaitDone(tableState) {
		tableState.state="idle";
		this.checkStart(tableState);
	}

	nextRound(tableState) {
		this.stateServer.clearTimeout(tableState.id);
		tableState.speakerIndex=this.getNextSeatByState(tableState,tableState.dealerIndex,"playing");

		if (tableState.communityCards.length==5) {
			this.nextShowMuck(tableState);
			return;
		}

		this.stateServer.setTimeout(tableState.id,30000);
		tableState.state="round";
		tableState.spokenAtCurrentBet=[];
		if (!this.hasPocketCards(tableState))
			this.dealPocketCards(tableState);

		else
			this.dealCommunityCards(tableState);
	}

	returnBet(tableState, seatIndex, amount) {
		tableState.seats[seatIndex].chips+=amount;
		tableState.seats[seatIndex].bet-=amount;
	}

	returnExcessiveBets(tableState) {
		let bets=[];

		for (let i=0; i<10; i++)
			bets.push(tableState.seats[i].bet);

		bets.sort();
		bets.reverse();
		let secondHighest = bets[1];

		for (let i=0; i<10; i++) {
			let seat=tableState.seats[i];
			if (seat.bet > secondHighest)
				this.returnBet(tableState,i,seat.bet-secondHighest);
		}
	}

	betsToPot(tableState) {
		this.returnExcessiveBets(tableState);

		for (let i=0; i<10; i++) {
			tableState.seats[i].potContrib+=tableState.seats[i].bet;
			tableState.seats[i].bet=0;
		}
	}

	roundAction(tableState, action, value) {
		switch (action) {
			case "fold":
				tableState.seats[tableState.speakerIndex].state="gameOver";
				break;

			case "call":
				let cost=this.getCostToCall(tableState);
				this.makeBetForSpeaker(tableState,cost);
				tableState.spokenAtCurrentBet.push(tableState.speakerIndex);
				break;

			case "raise":
				value=Math.max(value,this.getMinRaiseTo(tableState));
				value=Math.min(value,this.getMaxRaiseTo(tableState));
				this.makeBetForSpeaker(tableState,value-this.getSpeakerBet(tableState));
				tableState.spokenAtCurrentBet=[tableState.speakerIndex];
				break;
		}

		if (this.getNumSeatsByState(tableState,"playing")==1) {
			this.betsToPot(tableState);
			this.stateServer.clearTimeout(tableState.id);
			this.nextShowMuck(tableState);
		}

		else if (this.allHasSpoken(tableState)) {
			this.betsToPot(tableState);
			this.nextRound(tableState);
		}

		else {
			this.advanceSpeaker(tableState);
			this.stateServer.setTimeout(tableState.id,30000);
		}
	}

	askBlindAction(tableState, action, value) {
		switch (action) {
			case "postBlind":
				this.makeBetForSpeaker(tableState,
					tableState.stake/this.getCurrentBlindDivider(tableState));
				this.advanceSpeaker(tableState);
				this.stateServer.setTimeout(tableState.id,30000);
				if (this.getNumSeatsWithBets(tableState)>=2)
					this.nextRound(tableState);

				break;

			case "leave":
				this.returnExcessiveBets(tableState);
				tableState.seats[tableState.speakerIndex].user=null;
				tableState.seats[tableState.speakerIndex].chips=0;
				tableState.seats[tableState.speakerIndex].state="available";
				this.finishGame(tableState);
				break;
		}
	}

	showMuckAction(tableState,action) {
		switch (action) {
			case "show":
				tableState.seats[tableState.speakerIndex].state="show";
				this.stateServer.setTimeout(tableState.id,5000);
				break;

			case "muck":
				tableState.seats[tableState.speakerIndex].state="muck";
				this.nextShowMuck(tableState);
				break;
		}
	}

	handleSpeakerAction(tableState, action, value) {
		switch (tableState.state) {
			case "round":
				this.roundAction(tableState,action,value);
				break;

			case "askBlinds":
				this.askBlindAction(tableState,action,value);
				break;

			case "showMuck":
				this.showMuckAction(tableState,action);
		}
	}

	handleTimeout(tableState) {
		switch (tableState.state) {
			case "idle":
				console.log("timeout in idle state!!! strange...");
				break;

			case "askBlinds":
				this.askBlindAction(tableState,"leave");
				break;

			case "round":
				if (!this.getCostToCall(tableState))
					this.roundAction(tableState,"call");

				else
					this.roundAction(tableState,"fold");

				break;

			case "showMuck":
				if (tableState.seats[tableState.speakerIndex].state=="show")
					this.nextShowMuck(tableState);

				else
					this.showMuckAction(tableState,"muck");

				break;

			case "payout":
				this.finishGame(tableState);
				break;

			case "finished":
				this.finishWaitDone(tableState);
				break;
		}
	}
}

module.exports=TableController;