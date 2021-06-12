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

// ref: http://www.pokerbonus.com/bonus-codes/wsop-poker/tournaments/
export function getPayoutStructure(t) {
	if (t.users.length<2)
		throw new Error("Need at least 2 users");

	if (t.users.length<=10)
		return [70,30];

	if (t.users.length<=20)
		return [50,30,20];

	if (t.users.length<=30)
		return [37,25,15,12,11];

	return [35,22,15,11,9,8];
}

export function getWinners(t) {
	if (t.finishOrder.length!=t.users.length)
		throw new Error("finish order not same as num users");

	if (t.state!="finished")
		throw new Error("Can only get winners for finished tournament.");

	let finishOrder=JSON.parse(JSON.stringify(t.finishOrder));
	finishOrder.reverse();

	let winners={};
	let payoutStructure=getPayoutStructure(t);

	for (let i=0; i<payoutStructure.length; i++) {
		let winnings=Math.round(finishOrder.length*t.fee*payoutStructure[i]/100);
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

export function getRake(t) {
	let payouts=getPayouts(t);
	let total=0;

	for (let i in payouts)
		total+=payouts[i];

	return ((t.rakeFee+t.fee)*t.users.length-total);
}

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

export function getCurrentLevelIndex(t) {
	let levelDurationMillis=t.levelDuration*60000;

	return Math.floor(t.tournamentTime/levelDurationMillis);
}

export function getCurrentLevelTimeLeft(t) {
	let levelDurationMillis=t.levelDuration*60000;
	let levelIndex=getCurrentLevelIndex(t);
	let nextLevelAt=(levelIndex+1)*levelDurationMillis;

	return nextLevelAt-t.tournamentTime;
}

export function getCurrentStake(t) {
	let levelIndex=getCurrentLevelIndex(t,t.tournamentTime);
	return getStakeByLevel(t,levelIndex);
}
