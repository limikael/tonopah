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