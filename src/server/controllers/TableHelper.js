class TableHelper {
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

			if (seat.inGame && tableState.spokenAtCurrentBet.indexOf(i) < 0)
				return false;
		}

		return true;
	}
}

module.exports=TableHelper;