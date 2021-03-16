import * as PokerState from "./PokerState.mjs";

export function createTournamentState() {
	return {
		users: [],
		tables: [],
		state: "idle"
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
	for (let i=0; i<numTables; i++)
		t.tables[i]=PokerState.createPokerState();

	for (let i=0; i<t.users.length; i++) {
		let ti=i%numTables;
		let si=Math.floor(i/numTables);
		t.tables[ti]=PokerState.sitInUser(t.tables[ti],si,t.users[i],1000);
	}

	return t;
}

export function startTournament(t) {
	t=createTables(t);
	t.state="running";

	for (let i=0; i<t.tables.length; i++)
		t.tables[i]=PokerState.startGame(t.tables[i]);

	return t;
}

export function tableAction(t, ti, action, value) {
	t.tables[ti]=PokerState.action(t.tables[ti],action,value);

}

function breakTable(t, ti) {

}

function getTableWithMostAvailableSeats(t) {

}

function getTableWithMostPlayers(t) {

}

function getNumAvailableSeatsOnOther(t, ti) {
	
}