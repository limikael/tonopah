import * as PokerUtil from "./PokerUtil.mjs";

export function getTableIndexByUser(t, user) {
	for (let i=0; i<t.tables.length; i++)
		if (t.tables[i])
			if (PokerUtil.isUserSeatedAtTable(t.tables[i],user))
				return i;

	return -1;
}

export function getNumAvailableSeatsOnOther(t, ti) {
	let num=0;

	for (let i=0; i<t.tables.length; i++)
		if (t.tables[i] && i!=ti)
			num+=PokerUtil.getNumSeatsByState(t.tables[i],"available");

	return num;
}

export function numUsersAtTables(t) {
	let num=0;

	for (let i=0; i<t.tables.length; i++)
		if (t.tables[i])
			num+=PokerUtil.getNumUsers(t.tables[i]);

	return num;
}

export function getWinners(t) {
	if (t.finishOrder.length!=t.users.length)
		throw new Error("finish order not same as num users");

	let finishOrder=JSON.parse(JSON.stringify(t.finishOrder));
	finishOrder.reverse();
	let winners={};

	for (let i=0; i<t.payoutStructure.length; i++) {
		let winnings=Math.round(finishOrder.length*t.fee*t.payoutStructure[i]/100);
		winners[finishOrder[i]]=winnings;
	}

	return winners;
}