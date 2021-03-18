import * as PokerState from "./PokerState.mjs";
import * as PokerUtil from "./PokerUtil.mjs";
import * as TournamentUtil from "./TournamentUtil.mjs";
import ArrayUtil from "../../utils/ArrayUtil.js";

export function createTournamentState() {
	return {
		users: [],
		tables: [],
		state: "idle",
		startChips: 1000
	};
}

export function addUser(t, user) {
	if (t.state!="idle")
		throw new Error("Can only add users in idle state.");

	t.users.push(user);
	return t;
}

function createTables(t) {
	t.tables=[];

	let numTables=Math.ceil(t.users.length/10);
	for (let i=0; i<numTables; i++) {
		t.tables[i]=PokerState.createPokerState();
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

export function startTournament(t) {
	t=createTables(t);
	t.state="running";
	t.finishOrder=[];
	t=checkStartTables(t);

	return t;
}

export function tableAction(t, ti, action, value) {
	t.tables[ti]=PokerState.action(t.tables[ti],action,value);

	if (t.tables[ti].state=="idle") {
		let chips=[];

		for (let i=0; i<10; i++) {
			if (t.tables[ti].seats[i].user) {
				chips.push(t.tables[ti].seats[i].chips)

				if (!t.tables[ti].seats[i].chips) {
					let user=t.tables[ti].seats[i].user;

					t.finishOrder.push(user);
					t.tables[ti]=PokerState.removeUser(t.tables[ti],user);
				}
			}
		}

//		console.log("got to idle: "+chips);

/*		if (TournamentUtil.getNumAvailableSeatsOnOther(t,ti)>=
				PokerUtil.getNumUsers(t.tables[ti]))
			t=breakTable(t,ti);*/

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
			let av=t.tables.map(u=>PokerUtil.getNumSeatsByState(u,"available"));
			av[ti]=0;
			t=moveUserToTable(t,ArrayUtil.maxIndex(av),user);
		}
	}

	t.tables[ti]=null;
	return t;
}

function getNumAvailableSeatsOnOther(t, ti) {

}