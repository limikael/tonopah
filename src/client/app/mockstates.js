export default {
	"tournamentTable2 3 cards": {
		"seats": [{
			"user": "Kalle",
			"chips": 100,
			"bet": 123,
			"actionCount": 0,
			"cards": [3,4]
		},{},{},{},{},
		{},{},{},{},{}],
		"communityCards": [1,2,3],
		"pots": [123,456,789],
		"tournamentTableIndex": 2
	},

	"3 cards + pot": {
		"seats": [{
			"user": "Kalle",
			"chips": 100,
			"bet": 123,
			"actionCount": 0
		},{},{},{},{},
		{},{},{},{},{}],
		"communityCards": [1,2,3],
		"pots": [123,456,789]
	},

	"3 cards + action 1": {
		"seats": [{
			"user": "Kalle",
			"chips": 100,
			"bet": 123,
			"action": "raise",
			"actionCount": 1
		},{},{},{},{},
		{},{},{},{},{}],
		"communityCards": [1,2,3],
		"pots": [123,456,789]
	},

	"3 cards + action 2": {
		"seats": [{
			"user": "Kalle",
			"chips": 100,
			"bet": 123,
			"action": "call",
			"actionCount": 2
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

	"no cards 2 buttons": {
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
		"speakerIndex": 2
	},

	"folded": {
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
			"cards": [2,3],
			"state": "gameOver"
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
		"speakerIndex": 2
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
			"communityCards": [0,1],
			"seatCards": [0],
			"text": "three of a kind"
		},
		"speakerIndex": 1,
	},

	"dialog": {
		"seats": [
			{},{},{},{},{},
			{},{},{},{},{}
		],
		"dialogText": "Maximum sit in is 1000. Minimum is 10.\nHow much do you want to bring to the table?",
		"dialogValue": 100,
		"dialogButtons": [{
			"action": "cancel",
			"label": "cancel"
		},{
			"action": "sitIn",
			"label": "sit in"
		}]
	},

	"tournamentTable1 3 cards": {
		"seats": [{
			"user": "Kalle",
			"chips": 100,
			"bet": 123,
			"actionCount": 0
		},{},{},{},{},
		{},{},{},{},{}],
		"communityCards": [1,2,3],
		"pots": [123,456,789],
		"tournamentTableIndex": 1
	},

	"tournamentTable1 5 cards": {
		"seats": [{
			"user": "Kalle",
			"chips": 100,
			"bet": 123,
			"actionCount": 0
		},{},{},{},{},
		{},{},{},{},{}],
		"communityCards": [1,2,3,4,5],
		"pots": [123,456,789],
		"tournamentTableIndex": 1
	},

	"tournament registration": {
		"tournamentState": "registration"
	}
};