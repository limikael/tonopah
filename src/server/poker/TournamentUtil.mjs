import * as PokerUtil from "./PokerUtil.mjs";

export function getTableIndexByUser(t, user) {
	for (let i=0; i<t.tables.length; i++)
		if (t.tables[i])
			if (PokerUtil.isUserSeatedAtTable(t.tables[i],user))
				return i;

	return -1;
}