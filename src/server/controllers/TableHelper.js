const Hand=require("../../data/Hand.js");

class TableHelper {
	getSeatHand(tableState, seatIndex) {
		let cards=[];

		for (let card of tableState.communityCards)
			cards.push(card);

		for (let card of tableState.seats[seatIndex].cards)
			cards.push(card);

		return new Hand(cards);
	}

	isUserSpeaker(tableState, user) {
		if (!user)
			return false;

		if (tableState.speakerIndex===undefined || tableState.speakerIndex<0)
			return false;

		if (tableState.seats[tableState.speakerIndex].user==user)
			return true;

		return false;
	}

	isUserSeatedAtTable(tableState, user) {
		for (let seat of tableState.seats)
			if (seat.user==user)
				return true;

		return false;
	}

	getNumSeatsByState(tableState, states) {
		if (!Array.isArray(states))
			states=[states];

		let n=0;

		for (let seat of tableState.seats)
			if (states.includes(seat.state))
				n++;

		return n;
	}

	getNextSeatByState(tableState, index, states) {
		if (!Array.isArray(states))
			states=[states];

		if (!this.getNumSeatsByState(tableState,states))
			throw new Error("no players");

		if (isNaN(index))
			throw new Error("index is nan");

		index=(index+1)%10;
		while (!states.includes(tableState.seats[index].state))
			index=(index+1)%10;

		return index;
	}

	getNumSeatsWithBets(tableState) {
		let n=0;

		for (let seat of tableState.seats)
			if (seat.bet>0)
				n++;

		return n;
	}

	getCurrentBlindDivider(tableState) {
		// Heads up.
		if (this.getNumSeatsByState(tableState,"playing")==2) {
			if (this.getNumSeatsWithBets(tableState)==0)
				return 1;

			else
				return 2;
		}

		else {
			if (this.getNumSeatsWithBets(tableState)==0)
				return 2;

			else
				return 1;
		}
	}

	getCurrentBlindLabel(tableState) {
		switch (this.getCurrentBlindDivider(tableState)) {
			case 2:
				return "post sb";

			default:
				return "post bb";
		}
	}

	getSeatIndexByUser(tableState, user) {
		for (let i=0; i<10; i++)
			if (tableState.seats[i].user==user)
				return i;

		return -1;
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

	allHasSpoken(tableState) {
		for (let i=0; i<10; i++) {
			let seat=tableState.seats[i];

			if (seat.state=="playing" && tableState.spokenAtCurrentBet.indexOf(i) < 0)
				return false;
		}

		return true;
	}
}

module.exports=TableHelper;