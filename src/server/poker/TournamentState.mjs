import * as PokerState from "./PokerState.mjs";
import * as PokerUtil from "./PokerUtil.mjs";
import * as TournamentUtil from "./TournamentUtil.mjs";
import ArrayUtil from "../../utils/ArrayUtil.js";
import NumberUtil from "../../utils/NumberUtil.js";
import CurrencyFormatter from "../../utils/CurrencyFormatter.mjs";
import {v4 as uuidv4} from 'uuid';

export function applyConfiguration(t, conf) {
	let useConf={
		startChips: 1000,
		fee: 10,
		rakeFee: 1,
		currency: "ply",
		symbol: "ply",
		divisorPlaces: 0,
		startTime: undefined,
		levelDuration: 5,
		levelIncreasePercent: 75,
		stake: 2
	};

	for (let prop in useConf)
		if (conf && conf[prop])
			useConf[prop]=conf[prop];

	let intKeys=[
		"startChips","fee","rakeFee","seatsPerTable","divisorPlaces",
		"levelDuration","levelIncreasePercent","stake"
	];

	for (let key of intKeys)
		useConf[key]=NumberUtil.safeParseInt(useConf[key]);

	switch (t.state) {
		case "registration":
			t.startTime=useConf.startTime;
			t.fee=useConf.fee;
			t.rakeFee=useConf.rakeFee;
			t.currency=useConf.currency;
			t.startChips=useConf.startChips;
			t.symbol=useConf.symbol;
			t.divisorPlaces=useConf.divisorPlaces;
			t.levelIncreasePercent=useConf.levelIncreasePercent;
			t.levelDuration=useConf.levelDuration;
			t.stake=useConf.stake;
			break;
	}

	return t;
}

export function createTournamentState(conf) {
	let t={
		users: [],
		tables: [],
		state: "registration",
		seatsPerTable: 10,
		minPlayers: 2
	};

	t=applyConfiguration(t,conf);
	return t;
}

export function addUser(t, user) {
	if (t.state!="registration")
		throw new Error("Can only add users in registration state.");

	if (!user || t.users.indexOf(user)>=0)
		return t;

	t.users.push(user);
	return t;
}

export function removeUser(t, user) {
	if (!user || t.users.indexOf(user)<0)
		return t;

	t.users.splice(t.users.indexOf(user),1);

	return t;
}

export function setUserDialogText(t, user, text) {
	if (t.state!="registration") {
		console.log("Can only set dialog in registration state.");
		return t;
	}

	if (!t.userDialogs)
		t.userDialogs={};

	t.userDialogs[user]={
		dialogText: text,
		promptId: uuidv4()
	};

	return t;
}

export function removeUserDialog(t, user) {
	if (!t.userDialogs)
		return;

	delete t.userDialogs[user];
	return t;
}

function createTables(t) {
	t.tables=[];

	let numTables=Math.ceil(t.users.length/t.seatsPerTable);
	for (let i=0; i<numTables; i++) {
		t.tables[i]=PokerState.createPokerState({
			numSeats: t.seatsPerTable,
			rakePercent: 0
		});
		t.tables[i].state="finished";
		t.tables[i].autoPostBlinds=true;
	}

	for (let i=0; i<t.users.length; i++) {
		let ti=i%numTables;
		let si=Math.floor(i/numTables);
		t.tables[ti]=PokerState.sitInUser(t.tables[ti],si,t.users[i],t.startChips);
	}

	return t;
}

function checkStartTables(t) {
	let currentStake=TournamentUtil.getCurrentStake(t);

	for (let i=0; i<t.tables.length; i++) {
		if (t.tables[i] && 
				t.tables[i].state=="idle" &&
				PokerUtil.getNumUsers(t.tables[i])>=2) {
			t.tables[i]=PokerState.applyConfiguration(t.tables[i],{
				stake: currentStake
			});
			t.tables[i]=PokerState.startGame(t.tables[i]);
		}
	}

	return t;
}

export function cancelTournament(t) {
	t.state="canceled";

	return t;
}

export function startTournament(t) {
	if (t.users.length<2)
		throw new Error("Can't start tournament with fewer than 2 players");

	t=createTables(t);
	t.state="playing";
	t.spectatorTableIndex=0;
	t.finishOrder=[];
	t.tournamentTime=0;
	t=checkStartTables(t,0);

	return t;
}

export function tableAction(t, ti, action, value) {
	t.tables[ti]=PokerState.action(t.tables[ti],action,value);

	if (t.tables[ti].state=="idle") {
		for (let i=0; i<10; i++) {
			if (t.tables[ti].seats[i].user) {
				if (!t.tables[ti].seats[i].chips) {
					let user=t.tables[ti].seats[i].user;

					t.finishOrder.push(user);
					t.tables[ti]=PokerState.removeUser(t.tables[ti],user);
				}
			}
		}

		if (TournamentUtil.numUsersAtTables(t)==1) {
			for (let tti=0; tti<t.tables.length; tti++) {
				if (t.tables[tti]) {
					for (let si=0; si<10; si++) {
						if (t.tables[tti].seats[si].user) {
							let user=t.tables[tti].seats[si].user;

							t.finishOrder.push(user);
							t.tables[tti]=PokerState.removeUser(t.tables[tti],user);
						}
					}
				}
			}

			t.tables[ti]=null;
			t.state="finished";
			return t;
		}

		if (TournamentUtil.getNumAvailableSeatsOnOther(t,ti)>=
				PokerUtil.getNumUsers(t.tables[ti]))
			t=breakTable(t,ti);

		t=checkStartTables(t);
	}

	return t;
}

export function moveUserToTable(t, ti, user) {
	let cti=TournamentUtil.getTableIndexByUser(t,user);
	if (cti<0)
		throw new Error("user not seated");

	if (cti==ti)
		throw new Error("can't move to same table");

	if (t.tables[cti].state!="idle")
		throw new Error("can only move from idle table");

	let csi=PokerUtil.getSeatIndexByUser(t.tables[cti],user);
	let tsi=PokerUtil.getFirstSeatIndexByState(t.tables[ti],"available");
	if (tsi<0)
		throw new Error("no available seats on the table");

	let chips=t.tables[cti].seats[csi].chips;

	t.tables[ti]=PokerState.sitInUser(t.tables[ti],tsi,user,chips);
	t.tables[cti]=PokerState.removeUser(t.tables[cti],user);

	return t;
}

export function breakTable(t, ti) {
	for (let i=0; i<10; i++) {
		let user=t.tables[ti].seats[i].user;
		if (user) {
			let av=[];
			for (let tti=0; tti<t.tables.length; tti++) {
				if (tti!=ti && t.tables[tti])
					av[tti]=PokerUtil.getNumSeatsByState(t.tables[tti],"available");

				else
					av[tti]=0;
			}

			t=moveUserToTable(t,ArrayUtil.maxIndex(av),user);
		}
	}

	t.tables[ti]=null;
	return t;
}

export function setTournamentTime(t, time) {
	t.tournamentTime=time;
	return t;
}

export function presentRegistration(t, u, timeLeft) {
	let formatter=new CurrencyFormatter(t);

	let buttons=[];
	let texts=[
		"Welcome to the tournament!",
		"Tournament starts in: %t",
		"Registered players: "+t.users.length,
		"Registration fee: "+formatter.format(t.fee,"number")+" + "+formatter.format(t.rakeFee)
	];

	if (t.users.indexOf(u)>=0) {
		texts.push("You are registered for the tournament. See you at the tables!");
		buttons.push({
			action: "cancelRegistration",
			label: "Cancel Registration"
		});
	}

	else if (u) {
		buttons.push({
			action: "joinTournament",
			label: "Join Tournament"
		});
	}

	let p={
		tournamentState: "registration",
		tournamentStartsIn: timeLeft,
		tournamentTexts: texts,
		tournamentButtons: buttons
	};

	if (t.userDialogs && t.userDialogs[u]) {
		let d=t.userDialogs[u];

		p.promptId=d.promptId;
		p.dialogText=d.dialogText;
		p.dialogButtons=[{
			label: "ok",
			action: "dialogCancel"
		}];
	}

	return p;
}

export function presentPlaying(t, u, timeLefts) {
	let ti=TournamentUtil.getTableIndexByUser(t,u);

	if (ti<0) {
		for (let i=0; i<t.tables.length; i++)
			if (t.tables[i])
				ti=i;
	}

	// ti=t.spectatorTableIndex;

	let p=PokerState.present(t.tables[ti],u,timeLefts[ti]);

	p.tournamentTableIndex=ti;
	p.tournamentState="playing";

	p.statusTimeLeft=TournamentUtil.getCurrentLevelTimeLeft(t);

	let levelText=TournamentUtil.getCurrentLevelIndex(t)+1;
	let stake=TournamentUtil.getCurrentStake(t);
	let smallBlind=stake/2;
	p.statusText="Level: #"+levelText+" (%t)\nBlinds: "+smallBlind+" / "+stake;

	if (t.finishOrder.indexOf(u)>=0) {
		let place=t.users.length-t.finishOrder.indexOf(u);
		p.infoText="You finished as #"+place+".";
	}

	else
		p.infoText="";

	return p;
}

export function presentFinished(t, u) {
	let texts=[
		"Tournament finished!"
	];

	let winners=TournamentUtil.getWinners(t);
	let i=1;

	for (let user in winners) {
		texts.push(i+". "+user+" - "+winners[user]);
		i++;
	}

	return {
		tournamentState: "finished",
		tournamentTexts: texts
	}
}

export function presentCanceled(t, u) {
	let texts=[
		"The tournament was canceled due to too few registered players... :("
	];

	return {
		tournamentState: "finished",
		tournamentTexts: texts
	}
}