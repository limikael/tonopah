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

	if (t.state!="finished")
		throw new Error("Can only get winners for finished tournament.");

	let finishOrder=JSON.parse(JSON.stringify(t.finishOrder));
	finishOrder.reverse();
	let winners={};

	for (let i=0; i<t.payoutStructure.length; i++) {
		let winnings=Math.round(finishOrder.length*t.fee*t.payoutStructure[i]/100);
		winners[finishOrder[i]]=winnings;
	}

	return winners;
}

export function getPayouts(t) {
	let winners=getWinners(t);
	let payouts={};

	for (let user of t.finishOrder) {
		let payout=winners[user];
		if (!payout)
			payout=0;

		payouts[user]=payout;
	}

	return payouts;
}

/*export function getStakeByLevel(t, levelIndex) {
	let levelIncreaseBase=t.levelIncreaseBase;
	if (!levelIncreaseBase || levelIncreaseBase<1)
		levelIncreaseBase=1;

	let base=Math.pow(2,1/levelIncreaseBase);
	let factor=Math.pow(base,levelIndex);
	let cand=factor*t.stake;
	let stake=parseFloat(cand.toPrecision(1));
	let stakeEven=Math.round(stake/2)*2;

	return stakeEven;
}*/

export function getStakeByLevel(t, levelIndex) {
	let levelIncreasePercent=t.levelIncreasePercent;
	if (!levelIncreasePercent)
		levelIncreasePercent=0;

	let levelIncreaseBase=1+levelIncreasePercent/100;
	let factor=Math.pow(levelIncreaseBase,levelIndex);
	let cand=factor*t.stake;
	let stake=parseFloat(cand.toPrecision(1));
	let stakeEven=Math.round(stake/2)*2;

	return stakeEven;
}

export function getTournamentTime(t, time) {
	if (t.state!="playing")
		throw new Error("tournament time only applicable in playing state.");

	return t.storedTime+time-t.loadTime;
}