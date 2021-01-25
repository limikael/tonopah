const ArrayUtil=require("../../utils/ArrayUtil");
const Hand=require("../../data/Hand.js");

class TableController {

	sitInUser(tableState, seatIndex, user) {
		if (!tableState.seats[seatIndex].user &&
				!this.isUserSeatedAtTable(tableState,user)) {
			tableState.seats[seatIndex].user=user;
			tableState.seats[seatIndex].chips=100;
		}

		this.checkStart(tableState);
	}

	checkStart(tableState) {
		if (tableState.state=="idle" &&
				this.getNumberOfSitInUsers(tableState)>=2)
			this.startGame(tableState);
	}

	startGame(tableState) {
		for (let i=0; i<10; i++) {
			tableState.seats[i].bet=0;

			if (tableState.seats[i].user)
				tableState.seats[i].inGame=true;

			else
				tableState.seats[i].inGame=false;

			tableState.seats[i].cards=[];
			tableState.seats[i].potContrib=0;
			tableState.seats[i].show=false;
		}

		tableState.communityCards=[];
		tableState.deck=ArrayUtil.shuffle(ArrayUtil.range(52));
		tableState.deck=[10,1,20,30,40,2,50,5,14,15,5,21,22,23,24,25];

		this.advanceDealer(tableState);
		tableState.speakerIndex=this.getNextSeatIndexInGame(tableState,tableState.dealerIndex);
		tableState.state="askBlinds";
	}

	advanceDealer(tableState) {
		tableState.dealerIndex=
			this.getNextSeatIndexInGame(
				tableState,
				tableState.dealerIndex
			);
	}

	advanceSpeaker(tableState) {
		tableState.speakerIndex=
			this.getNextSeatIndexInGame(
				tableState,
				tableState.speakerIndex
			);
	}

	makeBetForSpeaker(tableState, amount) {
		tableState.seats[tableState.speakerIndex].chips-=amount;
		tableState.seats[tableState.speakerIndex].bet+=amount;
	}

	dealPocketCards(tableState) {
		for (let c=0; c<2; c++)	{
			for (let i=0; i<10; i++) {
				if (this.isSeatIndexInGame(tableState,i)) {
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
		tableState.seats[tableState.speakerIndex].show=true;
		this.stateServer.setTimeout(tableState.id,5000);
	}

	afterShowMuck(tableState) {
		if (tableState.speakerIndex==tableState.dealerIndex) {
			this.doPayouts(tableState);
			return;
		}

		this.advanceSpeaker(tableState);
		this.nextShowMuck(tableState);
	}

	doPayouts(tableState) {
		tableState.state="payout";
		this.stateServer.setTimeout(tableState.id,2000);
	}

	payoutDone(tableState) {
		tableState.state="finished";
		tableState.communityCards=[];
		for (let i=0; i<10; i++) {
			tableState.seats[i].bet=0;
			tableState.seats[i].potContrib=0;
			tableState.seats[i].cards=[];
		}
		this.stateServer.setTimeout(tableState.id,1000);
	}

	finishWaitDone(tableState) {
		tableState.state="idle";
		this.checkStart(tableState);
	}

	nextRound(tableState) {
		tableState.speakerIndex=this.getNextSeatIndexInGame(tableState,tableState.dealerIndex);

		if (tableState.communityCards.length==5) {
			this.nextShowMuck(tableState);
			return;
		}

		tableState.state="round";
		tableState.spokenAtCurrentBet=[];
		if (!this.hasPocketCards(tableState))
			this.dealPocketCards(tableState);

		else
			this.dealCommunityCards(tableState);
	}

	betsToPot(tableState) {
		for (let i=0; i<10; i++) {
			tableState.seats[i].potContrib+=tableState.seats[i].bet;
			tableState.seats[i].bet=0;
		}
	}

	roundAction(tableState, action, value) {
		switch (action) {
			case "fold":
				tableState.seats[tableState.speakerIndex].inGame=false;
				break;

			case "call":
				let cost=this.getCostToCall(tableState);
				this.makeBetForSpeaker(tableState,cost);
				tableState.spokenAtCurrentBet.push(tableState.speakerIndex);
				break;

			case "raise":
				break;
		}

		if (this.allHasSpoken(tableState)) {
			this.betsToPot(tableState);
			this.nextRound(tableState);
		}

		else
			this.advanceSpeaker(tableState);
	}

	askBlindAction(tableState, action, value) {
		switch (action) {
			case "postBlind":
				this.makeBetForSpeaker(tableState,tableState.stake);
				this.advanceSpeaker(tableState);
				if (this.getNumSeatsWithBets(tableState)>=2)
					this.nextRound(tableState);

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
		}
	}

	handleTimeout(tableState) {
		switch (tableState.state) {
			case "askBlinds":
				break;

			case "round":
				this.roundAction(tableState,"fold");
				break;

			case "showMuck":
				if (tableState.seats[tableState.speakerIndex].show) {
					this.afterShowMuck(tableState);
				}

				else
					this.showMuckAction(tableState,"muck");

				break;

			case "payout":
				this.payoutDone(tableState);
				break;

			case "finished":
				this.finishWaitDone(tableState);
				break;
		}
	}
}

module.exports=TableController;