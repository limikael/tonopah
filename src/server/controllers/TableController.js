const ArrayUtil=require("../../utils/ArrayUtil");

class TableController {
	isUserSeatedAtTable(tableState, user) {
		for (let seat of tableState.seats)
			if (seat.user==user)
				return true;

		return false;
	}

	getNumberOfSitInUsers(tableState) {
		let n=0;

		for (let seat of tableState.seats)
			if (seat.user)
				n++;

		return n;
	}

	getNumSeatsWithBets(tableState) {
		let n=0;

		for (let seat of tableState.seats)
			if (seat.bet>0)
				n++;

		return n;
	}

	sitInUser(tableState, seatIndex, user) {
		if (!tableState.seats[seatIndex].user &&
				!this.isUserSeatedAtTable(tableState,user)) {
			tableState.seats[seatIndex].user=user;
			tableState.seats[seatIndex].chips=100;
		}

		if (tableState.state=="idle" &&
				this.getNumberOfSitInUsers(tableState)>=4)
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
		}

		tableState.communityCards=[];
		tableState.deck=ArrayUtil.shuffle(ArrayUtil.range(52));
		this.advanceDealer(tableState);
		tableState.speakerIndex=this.getNextSeatIndexInGame(tableState,tableState.dealerIndex);
		tableState.state="askBlinds";
	}

	getSeatIndexByUser(tableState, user) {
		for (let i=0; i<10; i++)
			if (tableState.seats[i].user==user)
				return i;

		return -1;
	}

	isSeatIndexInGame(tableState, seatIndex) {
		if (tableState.seats[seatIndex].inGame)
			return true;

		return false;
	}

	getNextSeatIndexInGame(tableState, index) {
		if (!this.getNumberOfSitInUsers(tableState))
			throw new Error("no players");

		if (isNaN(index))
			index=-1;

		index=(index+1)%10;
		while (!this.isSeatIndexInGame(tableState,index))
			index=(index+1)%10;

		return index;
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

	hasPocketCards(tableState) {
		for (let c=0; c<2; c++)	{
			for (let i=0; i<10; i++) {
				if (tableState.seats[i].cards.length)
					return true;
			}
		}

		return false;
	}

	nextCard(tableState) {
		return tableState.deck.shift();
	}

	getHighestBet(tableState) {
		var high = 0;

		for (let seat of tableState.seats) 
			if (seat.bet>high)
				high=seat.bet;

		return high;
	}

	getCostToCall(tableState) {
		let seatIndex=tableState.speakerIndex;
		let seat=tableState.seats[seatIndex];
		let cand=this.getHighestBet(tableState)-seat.bet;

		if (cand>seat.chips)
			cand=seat.chips;

		return cand;
	}

	getMinRaiseTo(tableState) {
		let cand = this.getHighestBet(tableState) + tableState.stake;
		let currentSeat=tableState.seats[tableState.speakerIndex];

		if (cand > currentSeat.chips + currentSeat.bet)
			cand = currentSeat.chips + currentSeat.bet;

		return cand;
	}

	getMaxRaiseTo(tableState) {
		let currentSeat=tableState.seats[tableState.speakerIndex];
		var cand = currentSeat.chips + currentSeat.bet;

		return cand;
	}

	nextRound(tableState) {
		console.log("entering round!");

		tableState.state="round";
		tableState.spokenAtCurrentBet=[];
		if (!this.hasPocketCards(tableState))
			this.dealPocketCards(tableState);

		else
			this.dealCommunityCards(tableState);

		tableState.speakerIndex=this.getNextSeatIndexInGame(tableState,tableState.dealerIndex);
	}

	allHasSpoken(tableState) {
		for (let i=0; i<10; i++) {
			let seat=tableState.seats[i];

			if (seat.inGame && tableState.spokenAtCurrentBet.indexOf(i) < 0)
				return false;
		}

		return true;
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
}

module.exports=TableController;