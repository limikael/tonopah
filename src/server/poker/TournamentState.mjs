import * as PokerState from "./PokerState.mjs";
import * as PokerUtil from "./PokerUtil.mjs";
import * as TournamentUtil from "./TournamentUtil.mjs";
import ArrayUtil from "../../utils/ArrayUtil.js";
import NumberUtil from "../../utils/NumberUtil.js";

export function createTournamentState(conf) {
	let useConf={
		startChips: 1000,
		fee: 10,
		currency: "ply",
		seatsPerTable: 10,
		startTime: undefined,
		payoutStructure: [50,30,20],
		minPlayers: 2
	};

	for (let prop in useConf)
		if (conf && conf[prop])
			useConf[prop]=conf[prop];

	let intKeys=["startChips","fee","seatsPerTable"];
	for (let key of intKeys)
		useConf[key]=NumberUtil.safeParseInt(useConf[key]);

	let t={
		users: [],
		tables: [],
		state: "registration"
	};

	return {
		...t,
		...useConf
	}
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

function createTables(t) {
	t.tables=[];

	let numTables=Math.ceil(t.users.length/t.seatsPerTable);
	for (let i=0; i<numTables; i++) {
		t.tables[i]=PokerState.createPokerState({
			numSeats: t.seatsPerTable
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
	for (let i=0; i<t.tables.length; i++)
		if (t.tables[i] && 
				t.tables[i].state=="idle" &&
				PokerUtil.getNumUsers(t.tables[i])>=2)
			t.tables[i]=PokerState.startGame(t.tables[i]);

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
	t=checkStartTables(t);

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

export function presentRegistration(t, u, timeLeft) {
	let buttons=[];
	let texts=[
		"Welcome to the tournament!",
		"Tournament starts in: %t",
		"Registered players: "+t.users.length,
		"Registration fee: "+t.fee+" "+t.currency
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

	return {
		tournamentState: "registration",
		tournamentStartsIn: timeLeft,
		tournamentTexts: texts,
		tournamentButtons: buttons
	}
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