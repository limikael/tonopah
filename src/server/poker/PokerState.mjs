import * as PokerUtil from "./PokerUtil.mjs";
import ArrayUtil from "../../utils/ArrayUtil.js";
export {action} from "./PokerActions.mjs";

export function applyConfiguration(table, conf) {
	if (table.state!="idle")
		throw new Error("Can only apply configuration in idle state");

	let defaults={
		stake: 2,
		minSitInAmount: 10,
		maxSitInAmount: 100,
		currency: "ply"
	};

	return {
		...table,
		...defaults,
		...conf
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

	for (let i=0; i<10; i++)
		table.seats.push({
			user: "",
			cards: [],
			win: 0,
			potContrib: 0,
			chips: 0,
			bet: 0,
			state: "available",
			actionCount: 0
		});

	return applyConfiguration(table,conf);
}

export function sitInUser(table, seatIndex, user, amount) {
	if (!table.seats[seatIndex].user &&
			table.seats[seatIndex].state=="available" &&
			!PokerUtil.isUserSeatedAtTable(table,user)) {
		table.seats[seatIndex].user=user;
		table.seats[seatIndex].chips=amount;
		table.seats[seatIndex].state="gameOver";
	}

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
	return table;
}