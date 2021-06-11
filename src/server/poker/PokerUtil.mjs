import Hand from "../../data/Hand.js";
import ArrayUtil from "../../utils/ArrayUtil.js";

export function getSeatHand(tableState, seatIndex) {
	let cards=[];

	for (let card of tableState.communityCards)
		cards.push(card);

	for (let card of tableState.seats[seatIndex].cards)
		cards.push(card);

	return new Hand(cards);
}

export function getSpeakerUser(tableState) {
	if (tableState.speakerIndex===undefined || tableState.speakerIndex<0)
		return null;

	return tableState.seats[tableState.speakerIndex].user;
}

export function isUserSpeaker(tableState, user) {
	if (!user)
		return false;

	if (tableState.speakerIndex===undefined || tableState.speakerIndex<0)
		return false;

	if (tableState.seats[tableState.speakerIndex].user==user)
		return true;

	return false;
}

export function isUserSeatedAtTable(tableState, user) {
	if (!user)
		return false;

	for (let seat of tableState.seats)
		if (seat.user==user)
			return true;

	return false;
}

export function getNumUsers(tableState) {
	let n=0;

	for (let seat of tableState.seats)
		if (seat.user)
			n++;

	return n;
}

export function getFirstSeatIndexByState(tableState, states) {
	if (!Array.isArray(states))
		states=[states];

	for (let i=0; i<10; i++)
		if (states.includes(tableState.seats[i].state))
			return i;

	return -1;
}

export function getNumSeatsByState(tableState, states) {
	if (!Array.isArray(states))
		states=[states];

	let n=0;

	for (let seat of tableState.seats)
		if (states.includes(seat.state))
			n++;

	return n;
}

export function getNextSeatByState(tableState, index, states) {
	if (!Array.isArray(states))
		states=[states];

	if (!getNumSeatsByState(tableState,states))
		throw new Error("no players");

	if (isNaN(index))
		throw new Error("index is nan");

	index=(index+1)%10;
	while (!states.includes(tableState.seats[index].state))
		index=(index+1)%10;

	return index;
}

export function getNumSeatsWithBets(tableState) {
	let n=0;

	for (let seat of tableState.seats)
		if (seat.bet>0)
			n++;

	return n;
}

export function getCurrentBlindDivider(tableState) {
	// Heads up.
	if (getNumSeatsByState(tableState,"playing")==2) {
		if (getNumSeatsWithBets(tableState)==0)
			return 1;

		else
			return 2;
	}

	else {
		if (getNumSeatsWithBets(tableState)==0)
			return 2;

		else
			return 1;
	}
}

export function getReservingUsers(tableState) {
	let users=[];

	for (let i=0; i<10; i++)
		if (tableState.seats[i].user &&
				tableState.seats[i].state=="available")
			users.push(tableState.seats[i].user);

	return users;
}

export function getSeatedInUsers(tableState) {
	let users=[];

	for (let i=0; i<10; i++)
		if (tableState.seats[i].user &&
				tableState.seats[i].state!="available")
			users.push(tableState.seats[i].user);

	return users;
}

export function getRaiseLabel(tableState) {
	let raiseLabel="bet";
	if (getHighestBet(tableState))
		raiseLabel="raise";

	return raiseLabel;		
}

export function getCallLabel(tableState) {
	let callLabel="check";
	if (getCostToCall(tableState))
		callLabel="call";

	return callLabel;		
}

export function getCurrentBlindLabel(tableState) {
	switch (getCurrentBlindDivider(tableState)) {
		case 2:
			return "post sb";

		default:
			return "post bb";
	}
}

export function getSeatedInUserChips(tableState) {
	let res={};

	for (let user of getSeatedInUsers(tableState))
		res[user]=getUserChips(tableState,user);

	return res;
}

export function getUserChips(tableState, user) {
	let seatIndex=getSeatIndexByUser(tableState,user);
	if (seatIndex<0)
		return null;

	return tableState.seats[seatIndex].chips;
}

export function getUserSeatState(tableState, user) {
	let seatIndex=getSeatIndexByUser(tableState,user);
	if (seatIndex<0)
		return null;

	return tableState.seats[seatIndex].state;
}

export function getUserAttr(tableState, user, attr) {
	let seatIndex=getSeatIndexByUser(tableState,user);
	if (seatIndex<0)
		return null;

	return tableState.seats[seatIndex][attr];
}

export function getSeatIndexByUser(tableState, user) {
	if (!user)
		return -1;

	for (let i=0; i<10; i++)
		if (tableState.seats[i].user==user)
			return i;

	return -1;
}

export function hasPocketCards(tableState) {
	for (let c=0; c<2; c++)	{
		for (let i=0; i<10; i++) {
			if (tableState.seats[i].cards.length)
				return true;
		}
	}

	return false;
}

export function getSpeakerBet(tableState) {
	let seatIndex=tableState.speakerIndex;
	let seat=tableState.seats[seatIndex];

	return seat.bet;
}

export function getHighestBet(tableState) {
	var high = 0;

	for (let seat of tableState.seats) 
		if (seat.bet>high)
			high=seat.bet;

	return high;
}

export function getCostToCall(tableState) {
	let seatIndex=tableState.speakerIndex;
	let seat=tableState.seats[seatIndex];
	let cand=getHighestBet(tableState)-seat.bet;

	if (cand>seat.chips)
		cand=seat.chips;

	return cand;
}

export function getMinRaiseTo(tableState) {
	let cand = getHighestBet(tableState) + tableState.stake;
	let currentSeat=tableState.seats[tableState.speakerIndex];

	if (cand > currentSeat.chips + currentSeat.bet)
		cand = currentSeat.chips + currentSeat.bet;

	return cand;
}

export function getMaxRaiseTo(tableState) {
	let currentSeat=tableState.seats[tableState.speakerIndex];
	var cand = currentSeat.chips + currentSeat.bet;

	return cand;
}

export function allHasSpoken(tableState) {
	for (let i=0; i<10; i++) {
		let seat=tableState.seats[i];

		if (seat.state=="playing" && tableState.spokenAtCurrentBet.indexOf(i) < 0)
			return false;
	}

	return true;
}

export function speakerMustShow(tableState) {
	return mustShow(tableState,tableState.speakerIndex);
}

export function mustShow(tableState, seatIndex) {
	if (getNumSeatsByState(tableState,["playing","show"]) < 2)
		return false;

	let bestSoFar=null;
	let index=tableState.dealerIndex;
	index=getNextSeatByState(tableState,index,["playing","show"]);

	while (index!=seatIndex) {
		if (tableState.seats[index].potContrib>=tableState.seats[seatIndex].potContrib) {
			let hand=getSeatHand(tableState,index);
			if (Hand.compare(hand,bestSoFar)>0)
				bestSoFar=hand;
		}

		index=getNextSeatByState(tableState,index,["playing","show"]);
	}

	if (Hand.compare(getSeatHand(tableState,seatIndex),bestSoFar)>=0)
		return true;
}

export function getUnfoldedPotContribs(tableState) {
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

export function getWinningSeatsForPotContrib(tableState, potContrib) {
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
					getSeatHand(tableState,g),
					getSeatHand(tableState,bestSeats[0]));

				if (cmp > 0)
					bestSeats = [g];

				else if (cmp == 0)
					bestSeats.push(g);
			}
		}
	}

	return bestSeats;
}

export function getSplitPot(tableState, from, to) {
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

export function getPayoutsAndRake(tableState) {
	let limits=getUnfoldedPotContribs(tableState);
	let last=0;
	let payoutValues=[0,0,0,0,0,0,0,0,0,0];
	let totalRake=0;

	for (let l=0; l<limits.length; l++) {
		let limit=limits[l];
		let bestSeats=getWinningSeatsForPotContrib(tableState,limit);
		let pot=getSplitPot(tableState,last,limit);

		if (tableState.rakePercent) {
			let rawRake=pot*tableState.rakePercent/100;
			let rakeIncrement=tableState.stake*tableState.rakeStep/100;
			let rake=Math.floor(rakeIncrement*Math.floor(rawRake/rakeIncrement));

			//console.log("taking rake from: "+pot+" = "+rawRake+" inc: "+rakeIncrement);
			//console.log("taking rake: "+rake);

			pot-=rake;
			totalRake+=rake;
		}

		let payout=Math.round(pot/bestSeats.length);

		for (let g=0; g<bestSeats.length; g++) {
			let seatIndex=bestSeats[g];
			payoutValues[seatIndex]+=payout;
		}

		last=limit;
	}

	return {
		payout: payoutValues,
		rake: totalRake
	};
}

export function getPayouts(tableState) {
	return getPayoutsAndRake(tableState).payout;
}

export function getRake(tableState) {
	return getPayoutsAndRake(tableState).rake;
}

export function getBets(table) {
	let bets=[];

	for (let i=0; i<10; i++)
		bets.push(table.seats[i].bet);

	return bets;
}

export function getPots(tableState) {
	var last = 0;
	var limits = getUnfoldedPotContribs(tableState);
	var pots = [];

	for (var l = 0; l < limits.length; l++) {
		var limit = limits[l];

		pots.push(getSplitPot(tableState,last,limit));
		last = limit;
	}

	return pots;
}

export function canRaise(tableState) {
	if (tableState.raiseTimes==4)
		return false;

	let betAfterCall=getSpeakerBet(tableState)+getCostToCall(tableState);

	if (getMinRaiseTo(tableState)<=betAfterCall)
		return false;

	for (let i=0; i<10; i++) {
		if (i!=tableState.speakerIndex &&
				tableState.seats[i].state=="playing" &&
				tableState.seats[i].chips>0)
			return true;
	}

	return false;
}

export function isPromptMeaningful(tableState) {
	if (getCostToCall(tableState)==0 &&
			!canRaise(tableState))
		return false;

	return true;
}

export function isSpeakerShowing(tableState) {
	if (tableState.seats[tableState.speakerIndex].state=="show")
		return true;

	return false;
}

export function getTimeout(tableState) {
	switch (tableState.state) {
		case "askBlinds":
		case "round":
			return 30000;
			break;

		case "showMuck":
			if (isSpeakerShowing(tableState))
				return 5000;

			else
				return 10000;

			break;

		case "payout":
		case "finished":
			return 1000;
			break;
	}
}

export function getAvailableActions(tableState) {
	let actions=[];

	switch (tableState.state) {
		case "askBlinds":
			actions.push("leave");
			actions.push("postBlind");
			break;

		case "round":
			actions.push("fold");
			actions.push("call");

			if (canRaise(tableState))
				actions.push("raise");

			break;

		case "showMuck":
			if (tableState.seats[tableState.speakerIndex].state!="show") {
				actions.push("muck");
				actions.push("show");
			}
			break;
	}

	return actions;
}
