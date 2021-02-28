import * as PokerUtil from "./PokerUtil.mjs";

function presentButtons(tableState, user) {
	tableState.buttons=[];
	tableState.sliderMax=false;

	if (PokerUtil.isUserSpeaker(tableState,user)) {
		switch (tableState.state) {
			case "askBlinds":
				tableState.buttons=[{
					action: "leave"
				},{
					action: "postBlind",
					label: PokerUtil.getCurrentBlindLabel(tableState),
					value: tableState.stake/PokerUtil.getCurrentBlindDivider(tableState)
				}];
				break;

			case "round":
				tableState.buttons.push({
					action: "fold"
				});

				tableState.buttons.push({
					action: "call",
					label: PokerUtil.getCallLabel(tableState),
					value: PokerUtil.getCostToCall(tableState)
				});

				if (PokerUtil.canRaise(tableState)) {
					tableState.buttons.push({
						action: "raise",
						label: PokerUtil.getRaiseLabel(tableState),
						value: PokerUtil.getMinRaiseTo(tableState)
					});

					tableState.sliderMax=PokerUtil.getMaxRaiseTo(tableState);
				}
				break;

			case "showMuck":
				if (tableState.seats[tableState.speakerIndex].state!="show") {
					tableState.buttons=[{
						action: "muck"
					},{
						action: "show",
					}];
				}
				break;
		}
	}

	return tableState;
}

function presentSeats(tableState, user) {
	let userSeatIndex=PokerUtil.getSeatIndexByUser(tableState,user);

	for (let i=0; i<10; i++) {
		if (i!=userSeatIndex && tableState.seats[i].state!="show") {
			for (let j=0; j<tableState.seats[i].cards.length; j++) {
				tableState.seats[i].cards[j]=-1;
			}
		}

		switch (tableState.seats[i].state) {
			case "available":
				if (tableState.seats[i].user)
					tableState.seats[i].chips="RESERVED";

				else
					tableState.seats[i].chips="";

				break;
		}
	}

	tableState.pots=PokerUtil.getPots(tableState);

	return tableState;
}

function presentHighlight(tableState, user) {
	tableState.highlightCards=null;
	if (tableState.state=="showMuck") {
		if (tableState.seats[tableState.speakerIndex].state=="show") {
			if (tableState.communityCards.length==5) {
				let hand=PokerUtil.getSeatHand(tableState,tableState.speakerIndex);
				let communityCards=[];
				let seatCards=[];

				for (let i of hand.getUsedCardIndices())
					if (i<5)
						communityCards.push(i);

					else
						seatCards.push(i-5)

				tableState.highlightCards={
					communityCards: communityCards,
					seatCards: seatCards,
					text: hand.getScoreString()
				};
			}
		}
	}

	return tableState;
}

function presentTimeout(tableState, user, timeLeft) {
	tableState.timeLeft=null;
	tableState.totalTime=null;
	if (PokerUtil.getTimeout(tableState) &&
			["askBlinds","round","showMuck"].includes(tableState.state) &&
			!PokerUtil.isSpeakerShowing(tableState)) {
		tableState.totalTime=PokerUtil.getTimeout(tableState);
		tableState.timeLeft=timeLeft;
	}

	return tableState;
}

function presentDialog(tableState, user) {
	let userSeatIndex=PokerUtil.getSeatIndexByUser(tableState,user);

	tableState.dialogText=null;
	tableState.dialogValue=null;
	tableState.dialogButtons=[];
	if (userSeatIndex>=0 && tableState.seats[userSeatIndex].state=="available") {
		if (tableState.seats[userSeatIndex].dialogText) {
			tableState.dialogText=tableState.seats[userSeatIndex].dialogText;

			tableState.dialogButtons=[{
				label: "ok",
				action: "dialogCancel"
			}];
		}

		else {
			tableState.dialogText=
				"Welcome!\n"+
				"Minumum sit in amount is "+tableState.minSitInAmount+". "+
				"Maximum sit in amount is "+tableState.maxSitInAmount+".\n"+
				"How much do you want to bring?";

			tableState.dialogValue=tableState.minSitInAmount;
			tableState.dialogButtons=[{
				label: "cancel",
				action: "dialogCancel"
			},{
				label: "ok",
				action: "dialogOk"
			}];
		}
	}

	return tableState;
}

function presentInfo(tableState, user) {
	let userSeatIndex=PokerUtil.getSeatIndexByUser(tableState,user);

	tableState.infoText="";
	if (userSeatIndex<0) {
		tableState.infoText="Welcome! Click on a seat to join the game!";
	}

	else if (tableState.state=="idle" &&
			tableState.seats[userSeatIndex].state!="available") {
		tableState.infoText="Please wait for another player to join the game!";
	}

	return tableState;
}

export function present(tableState, user, timeLeft) {
	tableState=JSON.parse(JSON.stringify(tableState));

	tableState=presentButtons(tableState,user,timeLeft);
	tableState=presentSeats(tableState,user,timeLeft);
	tableState=presentHighlight(tableState,user,timeLeft);
	tableState=presentDialog(tableState,user,timeLeft);
	tableState=presentInfo(tableState,user,timeLeft);
	tableState=presentTimeout(tableState,user,timeLeft);

	return tableState;
}
