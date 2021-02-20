const Hand=require("../../data/Hand.js");
const ArrayUtil=require("../../utils/ArrayUtil");

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
		if (!user)
			return false;

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

	getRaiseLabel(tableState) {
		let raiseLabel="bet";
		if (this.getHighestBet(tableState))
			raiseLabel="raise";

		return raiseLabel;		
	}

	getCallLabel(tableState) {
		let callLabel="check";
		if (this.getCostToCall(tableState))
			callLabel="call";

		return callLabel;		
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
		if (!user)
			return -1;

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

	getSpeakerBet(tableState) {
		let seatIndex=tableState.speakerIndex;
		let seat=tableState.seats[seatIndex];

		return seat.bet;
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

	mustShow(tableState, seatIndex) {
		if (this.getNumSeatsByState(tableState,["playing","show"]) < 2)
			return false;

		let bestSoFar=null;
		let index=tableState.dealerIndex;
		index=this.getNextSeatByState(tableState,index,["playing","show"]);

		while (index!=seatIndex) {
			if (tableState.seats[index].potContrib>=tableState.seats[seatIndex].potContrib) {
				let hand=this.getSeatHand(tableState,index);
				if (Hand.compare(hand,bestSoFar)>0)
					bestSoFar=hand;
			}

			index=this.getNextSeatByState(tableState,index,["playing","show"]);
		}

		if (Hand.compare(this.getSeatHand(tableState,seatIndex),bestSoFar)>=0)
			return true;
	}

	getUnfoldedPotContribs(tableState) {
		let contribs = [];

		for (let i = 0; i < 10; i++) {
			var seat = tableState.seats[i];

			if (["playing","show","muck"].includes(seat.state)) {
				if (!contribs.includes(seat.potContrib))
					contribs.push(seat.potContrib);
			}
		}

		contribs.sort(ArrayUtil.compareNumbers);
		return contribs;
	}

	getWinningSeatsForPotContrib(tableState, potContrib) {
		let bestSeats=[];

		for (let g=0; g<10; g++) {
			let seat=tableState.seats[g];

			if (["playing","show","muck"].includes(seat.state) &&
					seat.potContrib >= potContrib) {
				if (!bestSeats.length) {
					bestSeats.push(g);
				}

				else {
					var cmp = Hand.compare(
						this.getSeatHand(tableState,g),
						this.getSeatHand(tableState,bestSeats[0]));

					if (cmp > 0)
						bestSeats = [g];

					else if (cmp == 0)
						bestSeats.push(g);
				}
			}
		}

		return bestSeats;
	}

	getSplitPot(tableState, from, to) {
		let pot = 0;

		for (var g = 0; g < 10; g++) {
			let seat=tableState.seats[g]

			if (seat.potContrib > from) {
				if (seat.potContrib > to)
					pot += to - from;

				else
					pot += seat.potContrib - from;
			}
		}

		return pot;
	}

	getPayouts(tableState) {
		let limits=this.getUnfoldedPotContribs(tableState);
		let last=0;
		let payoutValues=[0,0,0,0,0,0,0,0,0,0];

		for (let l=0; l<limits.length; l++) {
			let limit=limits[l];
			let bestSeats=this.getWinningSeatsForPotContrib(tableState,limit);
			let pot=this.getSplitPot(tableState,last,limit);
			let payout=Math.round(pot/bestSeats.length);

			for (let g=0; g<bestSeats.length; g++) {
				let seatIndex=bestSeats[g];
				payoutValues[seatIndex]+=payout;
			}

			last=limit;
		}

		return payoutValues;
	}
}

module.exports=TableHelper;