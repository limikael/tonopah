export default {
	"chips": {
		"seats": [{
			"user": "Player",
			"chips": "123 mBTC",
			"bet": 123
		},{
			"user": "Player",
			"chips": "5 bits",
			"bet": 1.1
		},{
			"user": "Player",
			"bet": 0.5
		},{
			"user": "Player",
			"bet": 0.00012
		},{
			"user": "Player",
			"bet": 1001.5
		},
		{
			"user": "Player",
			"bet": 250000
		},{
			"user": "Player",
		},{
			"user": "Player",
		},{
			"user": "Player",
		},{
			"user": "Player",
		}]
	},

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

	"5 cards + message": {
		"seats": [{
			"user": "Kalle",
			"chips": 100,
			"bet": 123
		},{},{},{},{},
		{},{},{},{},{}],
		"communityCards": [1,2,3,4,5],
		"infoText": "Welcome! Please take a seat at the table and let the game begin!"
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

	"full": {
		"seats": [{
			"user": "Kalle",
			"chips": 123,
			"bet": 1
		},{
			"user": "Olle",
			"chips": 200,
			"cards": [23,34],
			"bet": 2,
		},{
			"user": "Pelle",
			"chips": 300,
			"cards": [-1,-1],
			"potContrib": 55,
			"bet": 3
		},{
			"user": "Lisa",
			"chips": 400,
			"cards": [2,3],
			"bet": 4
		},{
			"user": "User 5",
			"chips": 400,
			"cards": [2,3],
			"bet": 5
		},{
			"user": "User 6",
			"chips": 400,
			"cards": [2,3],
			"bet": 6
		},{
			"user": "User 7",
			"chips": 400,
			"cards": [2,3],
			"bet": 7
		},{
			"user": "User 8",
			"chips": 400,
			"cards": [2,3],
			"bet": 8
		},{
			"user": "User 9",
			"chips": 400,
			"cards": [2,3],
			"bet": 9
		},{
			"user": "User 10",
			"chips": 400,
			"cards": [2,3],
			"bet": 10
		}],
		"communityCards": [0,1,2,3,4],
		"dealerIndex": 7,
		"buttons": [{
			"action": "fold",
		},{
			"action": "call"
		},{
			"action": "raise",
			"value": 10
		}],
		"sliderMax": 100,
		"pots": [7,13,17],
		"highlightCards": null,
		"speakerIndex": 2,
		"stake": 10,
		"divisorPlaces": 3
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
			"state": "inactive"
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
		"dialogMaxValue": 1000,
		"dialogButtons": [{
			"action": "cancel",
			"label": "cancel"
		},{
			"action": "sitIn",
			"label": "sit in"
		}],
		"promptId": 123,
		"stake": 1,
		"divisorPlaces": 2
	},

	"dialog2": {
		"seats": [
			{},{},{},{},{},
			{},{},{},{},{}
		],
		"dialogText": "Other dialog...",
		"dialogValue": 100,
		"dialogButtons": [{
			"action": "cancel",
			"label": "cancel"
		},{
			"action": "sitIn",
			"label": "sit in"
		}],
		"promptId":124
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
		"tournamentState": "registration",
		"tournamentStartsIn": 7200000,
		"tournamentButtons": [{
			"action": "joinTournament",
			"label": "Join Tournament"
		}],
		"tournamentTexts": [
			"Welcome to the turnament",
			"Tournament starts in: %t",
			"Registered players: 123"
		]
	},

	"tournament finished": {
		"tournamentState": "finished",
		"tournamentTexts": [
			"Congratulations!!!",
			"1. Olle - BTC 123",
			"2. Kalle - BTC 12",
			"3. Pelle - BTC 1"
		]
	}
};