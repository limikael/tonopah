import * as PokerUtil from "./PokerUtil.mjs";
import * as PokerActions from "./PokerActions.mjs";
import ArrayUtil from "../../utils/ArrayUtil.js";
import NumberUtil from "../../utils/NumberUtil.js";
export {action} from "./PokerActions.mjs";
export {present} from "./PokerPresenter.mjs";
import {v4 as uuidv4} from 'uuid';

export function applyConfiguration(table, conf) {
	if (table.state!="idle")
		throw new Error("Can only apply configuration in idle state");

	let useConf={
		stake: 2,
		minSitInAmount: 10,
		maxSitInAmount: 100,
		currency: "ply",
		numSeats: 10,
		divisorPlaces: 0
	};

	for (let prop in useConf)
		if (conf && conf[prop])
			useConf[prop]=conf[prop];

	let intKeys=["stake","minSitInAmount","maxSitInAmount","divisorPlaces"];
	for (let key of intKeys)
		useConf[key]=NumberUtil.safeParseInt(useConf[key]);

	return {
		...table,
		...useConf
	}
}

export function createPokerState(conf) {
	let table={
		seats: [],
		communityCards: [],
		dealerIndex: -1,
		speakerIndex: -1,
		state: "idle",
		deck: []
	};

	table=applyConfiguration(table,conf)

	for (let i=0; i<10; i++) {
		let seatState="available";
		if (i>=table.numSeats)
			seatState="inactive";

		table.seats.push({
			user: null,
			cards: [],
			win: 0,
			potContrib: 0,
			chips: 0,
			bet: 0,
			state: seatState,
			actionCount: 0
		});
	}

	return table;
}

export function reserveSeat(table, seatIndex, user) {
	if (PokerUtil.isUserSeatedAtTable(table,user))
		return table;

	if (user &&
			table.seats[seatIndex].state=="available" &&
			!table.seats[seatIndex].user) {
		table.seats[seatIndex].promptId=uuidv4();
		table.seats[seatIndex].user=user;
	}

	return table;
}

export function sitInUser(table, seatIndex, user, amount) {
	if (!user || !(seatIndex>=0) || !(amount>=1))
		return table;

	if (PokerUtil.isUserSeatedAtTable(table,user) && 
			PokerUtil.getUserSeatState(table,user)!="available")
		return table;

	if (table.seats[seatIndex].user &&
			table.seats[seatIndex].user!=user)
		return table;

	if (table.seats[seatIndex].state!="available")
		return table;

	amount=NumberUtil.safeParseInt(amount);
	table=removeUser(table,user);
	table.seats[seatIndex].user=user;
	table.seats[seatIndex].chips=amount;
	table.seats[seatIndex].state="gameOver";

	return table;
}

export function setUserDialogText(table, user, text) {
	let seatIndex=PokerUtil.getSeatIndexByUser(table,user);
	if (seatIndex<0)
		return table;

	table.seats[seatIndex].dialogText=text;
	table.seats[seatIndex].promptId=uuidv4();

	return table;
}

export function removeUser(table, user) {
	let seatIndex=PokerUtil.getSeatIndexByUser(table,user);
	if (seatIndex<0)
		return table;

	table.seats[seatIndex].dialogText=null;
	table.seats[seatIndex].user=null;
	table.seats[seatIndex].state="available";
	table.seats[seatIndex].bet=0;
	table.seats[seatIndex].chips=0;
	table.seats[seatIndex].promptId=null;

	return table;
}

function advanceDealer(table) {
	table.dealerIndex=
		PokerUtil.getNextSeatByState(
			table,
			table.dealerIndex,
			"playing"
		);

	return table;
}

export function checkStart(table) {
	if (table.state=="idle" &&
			PokerUtil.getNumSeatsByState(table,"gameOver")>=2)
		table=startGame(table);

	return table;
}

export function	startGame(table, deck) {
	if (table.state!="idle")
		throw new Error("Can only start if idle.");

	if (PokerUtil.getNumSeatsByState(table,"gameOver")<2)
		throw new Error("Need 2 players to start.");

	for (let i=0; i<10; i++) {
		table.seats[i].bet=0;

		if (table.seats[i].state=="gameOver")
			table.seats[i].state="playing";

		table.seats[i].cards=[];
		table.seats[i].potContrib=0;
		table.seats[i].action="";
		table.seats[i].actionCount=0;
	}

	table.communityCards=[];

	if (deck)
		table.deck=[...deck];

	else
		table.deck=ArrayUtil.shuffle(ArrayUtil.range(52));

	table=advanceDealer(table);
	table.speakerIndex=PokerUtil.getNextSeatByState(table,table.dealerIndex,"playing");
	table.state="askBlinds";

	if (table.autoPostBlinds) {
		while (table.state=="askBlinds")
			table=PokerActions.action(table,"postBlind");
	}

	return table;
}
