export default {
	"3 cards + pot": {
		"seats": [{
			"user": "Kalle",
			"chips": 100,
			"bet": 123
		},{},{},{},{},
		{},{},{},{},{}],
		"communityCards": [1,2,3],
		"pots": [123,456,789]
	},

	"pot contrib 0": {
		"seats": [{},{},{},{},{},{},{},{
			"user": "Kalle",
			"chips": 100,
			"bet": 17,
			"potContrib": 0
		},{"potContrib":0},{"potContrib":0}],
		"pots": [0]
	},

	"pot contrib 13": {
		"seats": [{},{},{},{},{},{},{},{
			"user": "Kalle",
			"chips": 100,
			"potContrib": 13,
			"bet": 4
		},{"potContrib":0},{"potContrib":0}],
		"pots": [13]
	},

	"pot contrib 17": {
		"seats": [{},{},{},{},{},{},{},{
			"user": "Kalle",
			"chips": 100,
			"potContrib": 17,
			"bet": 0
		},{"potContrib":0},{"potContrib":0}],
		"pots": [17]
	},

	"win 17": {
		"seats": [{},{},{},{},{},{},{},{
			"user": "Kalle",
			"chips": 100,
			"potContrib": 0,
			"bet": 0,
			"win": 17
		},{"potContrib":0},{"potContrib":0}],
		"pots": [0]
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
		"buttons": [{
			"action": "fold",
		},{
			"action": "call"
		},{
			"action": "raise",
			"value": 123
		}]
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
		"sliderMax": 500,
		"pots": [7,13,17],
		"highlightCards": null,
		"timeLeft": 15000,
		"totalTime": 30000,
		"seatIndex": 2
	},

	"highlight_cards": {
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
		"sliderMax": 500,
		"pots": [7,13,17],
		"highlightCards": {
			"seatIndex": 1,
			"communityCards": [0,1],
			"seatCards": [0],
			"text": "three of a kind"
		}
	}
};