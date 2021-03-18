import * as PokerUtil from "./PokerUtil.mjs";

function advanceSpeaker(table) {
	table.speakerIndex=
		PokerUtil.getNextSeatByState(
			table,
			table.speakerIndex,
			"playing"
		);

	return table;
}

function makeBetForSpeaker(table, amount) {
	table.seats[table.speakerIndex].chips-=amount;
	table.seats[table.speakerIndex].bet+=amount;
	return table;
}

function dealPocketCards(table) {
	for (let c=0; c<2; c++)
		for (let i=0; i<10; i++)
			if (table.seats[i].state=="playing")
				table.seats[i].cards.push(table.deck.shift());

	return table;
}

function dealCommunityCards(table) {
	let numCards=1;
	if (!table.communityCards.length)
		numCards=3;

	for (let i=0; i<numCards; i++)
		table.communityCards.push(table.deck.shift());

	return table;
}

function returnBet(table, seatIndex, amount) {
	table.seats[seatIndex].chips+=amount;
	table.seats[seatIndex].bet-=amount;

	return table;
}

function returnExcessiveBets(table) {
	let bets=[];

	for (let i=0; i<10; i++)
		bets.push(table.seats[i].bet);

	bets.sort((a,b)=>b-a);
	let secondHighest = bets[1];

	for (let i=0; i<10; i++) {
		let seat=table.seats[i];
		if (seat.bet > secondHighest)
			table=returnBet(table,i,seat.bet-secondHighest);
	}

	return table;
}

function betsToPot(table) {
	table=returnExcessiveBets(table);

	for (let i=0; i<10; i++) {
		table.seats[i].potContrib+=table.seats[i].bet;
		table.seats[i].bet=0;
	}

	return table;
}

function speakerAction(table, action) {
	table.seats[table.speakerIndex].action=action;
	table.seats[table.speakerIndex].actionCount++;
	return table;
}

function nextShowMuck(table) {
	table.state="showMuck";
	if (!PokerUtil.getNumSeatsByState(table,"playing"))
		return doPayouts(table);

	table.speakerIndex=PokerUtil.getNextSeatByState(table,table.dealerIndex,"playing");

	if (PokerUtil.speakerMustShow(table))
		table.seats[table.speakerIndex].state="show";

	return table;
}

function doPayouts(table) {
	table.speakerIndex=-1;
	table.state="payout";
	let payouts=PokerUtil.getPayouts(table);
	for (let i=0; i<10; i++) {
		table.seats[i].chips+=payouts[i];
		table.seats[i].win=payouts[i];
		table.seats[i].potContrib=0;
	}

	return table;
}

function finishGame(table) {
	table.raiseTimes=0;
	table.spokenAtCurrentBet=[];
	table.state="finished";
	table.communityCards=[];
	table.speakerIndex=-1;
	for (let i=0; i<10; i++) {
		table.seats[i].bet=0;
		table.seats[i].potContrib=0;
		table.seats[i].cards=[];
		table.seats[i].win=0;
		table.seats[i].action="";
		table.seats[i].actionCount=0;

		if (table.seats[i].state=="playing" ||
				table.seats[i].state=="show" ||
				table.seats[i].state=="muck")
			table.seats[i].state="gameOver";
	}

	return table;
}

function finishWaitDone(table) {
	table.state="idle";
	return table;
}

function nextRound(table) {
	table.speakerIndex=PokerUtil.getNextSeatByState(table,table.dealerIndex,"playing");

	if (table.communityCards.length==5)
		return nextShowMuck(table);

	table.state="round";
	table.spokenAtCurrentBet=[];
	table.raiseTimes=0;

	if (!PokerUtil.hasPocketCards(table))
		table=dealPocketCards(table);

	else
		table=dealCommunityCards(table);

	if (!PokerUtil.isPromptMeaningful(table))
		return action(table,"call");

	return table;
}

function roundAction(table, action, value) {
	if (action=="raise" && !PokerUtil.canRaise(table))
		action="call";

	switch (action) {
		case "fold":
			table.seats[table.speakerIndex].state="gameOver";
			table=speakerAction(table,"fold");
			break;

		case "raise":
			table.raiseTimes++;
			table=speakerAction(table,PokerUtil.getRaiseLabel(table));
			if (isNaN(value))
				value=0;

			value=Math.max(value,PokerUtil.getMinRaiseTo(table));
			value=Math.min(value,PokerUtil.getMaxRaiseTo(table));
			table=makeBetForSpeaker(table,value-PokerUtil.getSpeakerBet(table));
			table.spokenAtCurrentBet=[table.speakerIndex];
			break;

		case "call":
		default:
			table=speakerAction(table,PokerUtil.getCallLabel(table));
			let cost=PokerUtil.getCostToCall(table);
			table=makeBetForSpeaker(table,cost);
			table.spokenAtCurrentBet.push(table.speakerIndex);
			break;
	}

	if (PokerUtil.getNumSeatsByState(table,"playing")==1) {
		table=betsToPot(table);
		return nextShowMuck(table);
	}

	if (PokerUtil.allHasSpoken(table)) {
		table=betsToPot(table);
		return nextRound(table);
	}

	table=advanceSpeaker(table);
	if (!PokerUtil.isPromptMeaningful(table))
		return roundAction(table,"call");

	return table;
}

function askBlindAction(table, action) {
	switch (action) {
		case "postBlind":
			table=speakerAction(table,PokerUtil.getCurrentBlindLabel(table));
			table=makeBetForSpeaker(table,
				table.stake/PokerUtil.getCurrentBlindDivider(table));

			table=advanceSpeaker(table);
			if (PokerUtil.getNumSeatsWithBets(table)>=2)
				table=nextRound(table);

			break;

		case "leave":
		default:
			table=returnExcessiveBets(table);
			table.seats[table.speakerIndex].state="leave";
			table=finishGame(table);
			break;
	}

	return table;
}

function showMuckAction(table, action) {
	if (table.seats[table.speakerIndex].state=="show")
		return nextShowMuck(table);

	switch (action) {
		case "show":
			table.seats[table.speakerIndex].state="show";
			break;

		case "muck":
		default:
			table=speakerAction(table,"muck");
			table.seats[table.speakerIndex].state="muck";
			table=nextShowMuck(table);
			break;
	}

	return table;
}

export function action(table, action, value) {
	switch (table.state) {
		case "round":
			table=roundAction(table,action,value);
			break;

		case "askBlinds":
			table=askBlindAction(table,action);
			break;

		case "showMuck":
			table=showMuckAction(table,action);
			break;

		case "payout":
			table=finishGame(table);
			break;

		case "finished":
			table=finishWaitDone(table);
			break;
	}

	return table;
}