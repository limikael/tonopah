export default {
	"pot contrib 0": {
		"seats": [{},{},{},{},{},{},{},{
			"user": "Kalle",
			"chips": 100,
			"potContrib": 0
		},{"potContrib":0},{"potContrib":0}]
	},

	"pot contrib 13": {
		"seats": [{},{},{},{},{},{},{},{
			"user": "Kalle",
			"chips": 100,
			"potContrib": 13
		},{"potContrib":5},{"potContrib":10}]
	},

	"pot contrib 17": {
		"seats": [{},{},{},{},{},{},{},{
			"user": "Kalle",
			"chips": 100,
			"potContrib": 17
		},{"potContrib":10},{"potContrib":20}]
	},

	"3 cards": {
		"seats": [{
			"user": "Kalle",
			"chips": 100,
			"bet": 123
		},{},{},{},{},
		{},{},{},{},{}],
		"communityCards": [1,2,3],
	},

	"5 cards": {
		"seats": [{
			"user": "Kalle",
			"chips": 100,
			"bet": 123
		},{},{},{},{},
		{},{},{},{},{}],
		"communityCards": [1,2,3,4,5],
	},

	"no cards": {
		"seats": [{
			"user": "Kalle",
			"chips": 100,
			"bet": 123
		},{},{},{},{},
		{},{},{},{},{}],
		"communityCards": [],
	},

	"players_and_cards": {
		"seats": [{
			"user": "Kalle",
			"chips": 100,
			"bet": 123
		},{
			"user": "Olle",
			"chips": 200,
			"cards": [23,34],
			"bet": 5,
		},{
			"user": "Pelle",
			"chips": 300,
			"cards": [-1,-1],
			"potContrib": 55,
		},{
			"user": "Lisa",
			"chips": 400,
			"cards": [2,3]
		},{

		},{

		},{

		},{

		},{

		},{
		}],
		"communityCards": [0,1,2,3,4],
		"dealerIndex": 3,
		"buttons": [{
			"action": "fold",
		},{
			"action": "call"
		},{
			"action": "raise",
			"value": 123
		}],
		"pots": [7,13,17]
	}
};