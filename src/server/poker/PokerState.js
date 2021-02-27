function applyDefaults(o, def) {
	if (!o)
		o={};

	for (let key in def)
		if (!o.hasOwnProperty(key))
			o[key]=def[key];

	return o;
}

function applyConfiguration(table, conf) {
	if (table.state!="idle")
		throw new Error("Can only apply configuration in idle state");

	

	conf=applyDefaults(conf,{
		stake: 2,
		minSitInAmount: 10,
		maxSitInAmount: 100,
		currency: "ply"
	});

	table={...table,...conf};

	return table;
}

function createPokerState(conf) {
	let table={
		seats: [],
		communityCards: [],
		dealerIndex: -1,
		state: "idle"
	};

	for (let i=0; i<10; i++)
		table.seats.push({
			user: "",
			cards: [],
			win: 0,
			potContrib: 0,
			chips: 0,
			bet: 0,
			state: "available"
		});

	return applyConfiguration(table,conf);
}

module.exports={
	createPokerState,
	applyConfiguration
};