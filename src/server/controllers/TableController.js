const ArrayUtil=require("../../utils/ArrayUtil");
const Hand=require("../../data/Hand.js");

class TableController {

	sitInUser(tableState, seatIndex, user) {
		if (!tableState.seats[seatIndex].user &&
				tableState.seats[seatIndex].state=="available" &&
				!this.isUserSeatedAtTable(tableState,user)) {
			tableState.seats[seatIndex].user=user;
		}
	}

	async confirmSitInUser(tableState, user, amount) {
		let seatIndex=this.getSeatIndexByUser(tableState,user);
		if (seatIndex<0)
			return;

		if (tableState.seats[seatIndex].state!="available")
			return;

		try {
			await this.backend.fetch({
				call: "joinCashGame",
				user: user,
				amount: amount,
				tableId: tableState.id
			});
		}

		catch (e) {
			tableState.seats[seatIndex].dialogText=String(e);
			return;
		}

		tableState.seats[seatIndex].chips=amount;
		tableState.seats[seatIndex].state="gameOver";

		await this.saveRunningTableState(tableState);

		if (!tableState.skipAutoStart)
			this.checkStart(tableState);
	}

	cancelSitInUser(tableState, user) {
		let seatIndex=this.getSeatIndexByUser(tableState,user);
		if (seatIndex<0)
			return;

		if (tableState.seats[seatIndex].state!="available")
			return;

		tableState.seats[seatIndex].user=null;
		tableState.seats[seatIndex].dialogText=null;
	}

	checkStart(tableState) {
		if (tableState.state=="idle" &&
				this.getNumSeatsByState(tableState,"gameOver")>=2)
			this.startGame(tableState);
	}

	startGame(tableState) {
		for (let i=0; i<10; i++) {
			tableState.seats[i].bet=0;

			if (tableState.seats[i].state=="gameOver")
				tableState.seats[i].state="playing";

			tableState.seats[i].cards=[];
			tableState.seats[i].potContrib=0;
			tableState.seats[i].action="";
			tableState.seats[i].actionCount=0;
		}

		tableState.communityCards=[];
		tableState.deck=ArrayUtil.shuffle(ArrayUtil.range(52));
		//tableState.deck=[10,1,20,30,40,2,50,5,14,15,5,21,22,23,24,25];

		this.advanceDealer(tableState);
		tableState.speakerIndex=this.getNextSeatByState(tableState,tableState.dealerIndex,"playing");
		tableState.state="askBlinds";
		this.timeoutManager.setTimeout(tableState.id,30000);
	}

	advanceDealer(tableState) {
		tableState.dealerIndex=
			this.getNextSeatByState(
				tableState,
				tableState.dealerIndex,
				"playing"
			);
	}

	advanceSpeaker(tableState) {
		tableState.speakerIndex=
			this.getNextSeatByState(
				tableState,
				tableState.speakerIndex,
				"playing"
			);
	}

	makeBetForSpeaker(tableState, amount) {
		tableState.seats[tableState.speakerIndex].chips-=amount;
		tableState.seats[tableState.speakerIndex].bet+=amount;
	}

	dealPocketCards(tableState) {
		for (let c=0; c<2; c++)	{
			for (let i=0; i<10; i++) {
				if (tableState.seats[i].state=="playing") {
					tableState.seats[i].cards.push(this.nextCard(tableState));
				}
			}
		}
	}

	dealCommunityCards(tableState) {
		let numCards=1;
		if (!tableState.communityCards.length)
			numCards=3;

		for (let i=0; i<numCards; i++)
			tableState.communityCards.push(this.nextCard(tableState));
	}

	nextCard(tableState) {
		return tableState.deck.shift();
	}

	nextShowMuck(tableState) {
		tableState.state="showMuck";
		if (!this.getNumSeatsByState(tableState,"playing")) {
			this.doPayouts(tableState);
			return;
		}

		tableState.speakerIndex=this.getNextSeatByState(tableState,tableState.dealerIndex,"playing");

		if (this.mustShow(tableState,tableState.speakerIndex)) {
			tableState.seats[tableState.speakerIndex].state="show";
			this.timeoutManager.setTimeout(tableState.id,5000);
		}

		else {
			this.timeoutManager.setTimeout(tableState.id,10000);
		}
	}

	doPayouts(tableState) {
		tableState.state="payout";
		let payouts=this.getPayouts(tableState);
		for (let i=0; i<10; i++) {
			tableState.seats[i].chips+=payouts[i];
			tableState.seats[i].win=payouts[i];
			tableState.seats[i].potContrib=0;
		}
		this.timeoutManager.setTimeout(tableState.id,2000);
	}

	async finishGame(tableState) {
		tableState.raiseTimes=0;
		tableState.spokenAtCurrentBet=[];
		tableState.state="finished";
		tableState.communityCards=[];
		for (let i=0; i<10; i++) {
			tableState.seats[i].bet=0;
			tableState.seats[i].potContrib=0;
			tableState.seats[i].cards=[];
			tableState.seats[i].win=0;
			tableState.seats[i].action="";
			tableState.seats[i].actionCount=0;

			if (tableState.seats[i].state=="playing" ||
					tableState.seats[i].state=="show" ||
					tableState.seats[i].state=="muck")
				tableState.seats[i].state="gameOver";

			if (tableState.seats[i].user) {
				if (!this.server.isUserConnected(tableState.id,tableState.seats[i].user)
						|| !tableState.seats[i].chips) {
					this.removeUserFromSeat(tableState,i);
				}
			}
		}
		this.timeoutManager.setTimeout(tableState.id,1000);

		let data=await this.backend.fetch({
			call: "getCashGame",
			tableId: tableState.id
		});

		await this.applyTableSateConfiguration(tableState,data);
		await this.saveRunningTableState(tableState);
	}

	async removeUserFromSeat(tableState, seatIndex) {
		await this.backend.fetch({
			call: "leaveCashGame",
			tableId: tableState.id,
			user: tableState.seats[seatIndex].user,
			amount: tableState.seats[seatIndex].chips
		});

		tableState.seats[seatIndex].dialogTest=null;
		tableState.seats[seatIndex].user=null;
		tableState.seats[seatIndex].state="available";
		tableState.seats[seatIndex].bet=0;
		tableState.seats[seatIndex].chips=0;
	}

	async finishWaitDone(tableState) {
		tableState.state="idle";
		this.checkStart(tableState);
	}

	nextRound(tableState) {
		this.timeoutManager.clearTimeout(tableState.id);
		tableState.speakerIndex=this.getNextSeatByState(tableState,tableState.dealerIndex,"playing");

		if (tableState.communityCards.length==5) {
			this.nextShowMuck(tableState);
			return;
		}

		tableState.state="round";
		tableState.spokenAtCurrentBet=[];
		tableState.raiseTimes=0;
		if (!this.hasPocketCards(tableState))
			this.dealPocketCards(tableState);

		else
			this.dealCommunityCards(tableState);

		if (!this.isPromptMeaningful(tableState))
			this.roundAction(tableState,"call");

		else
			this.timeoutManager.setTimeout(tableState.id,30000);
	}

	returnBet(tableState, seatIndex, amount) {
		tableState.seats[seatIndex].chips+=amount;
		tableState.seats[seatIndex].bet-=amount;
	}

	returnExcessiveBets(tableState) {
		let bets=[];

		for (let i=0; i<10; i++)
			bets.push(tableState.seats[i].bet);

		bets.sort();
		bets.reverse();
		let secondHighest = bets[1];

		for (let i=0; i<10; i++) {
			let seat=tableState.seats[i];
			if (seat.bet > secondHighest)
				this.returnBet(tableState,i,seat.bet-secondHighest);
		}
	}

	betsToPot(tableState) {
		this.returnExcessiveBets(tableState);

		for (let i=0; i<10; i++) {
			tableState.seats[i].potContrib+=tableState.seats[i].bet;
			tableState.seats[i].bet=0;
		}
	}

	speakerAction(tableState, action) {
		tableState.seats[tableState.speakerIndex].action=action;
		tableState.seats[tableState.speakerIndex].actionCount++;
	}

	async roundAction(tableState, action, value) {
		switch (action) {
			case "fold":
				tableState.seats[tableState.speakerIndex].state="gameOver";
				this.speakerAction(tableState,"fold");
				break;

			case "call":
				this.speakerAction(tableState,this.getCallLabel(tableState));
				let cost=this.getCostToCall(tableState);
				this.makeBetForSpeaker(tableState,cost);
				tableState.spokenAtCurrentBet.push(tableState.speakerIndex);
				break;

			case "raise":
				if (!this.canRaise(tableState))
					return;

				tableState.raiseTimes++;
				this.speakerAction(tableState,this.getRaiseLabel(tableState));
				value=Math.max(value,this.getMinRaiseTo(tableState));
				value=Math.min(value,this.getMaxRaiseTo(tableState));
				this.makeBetForSpeaker(tableState,value-this.getSpeakerBet(tableState));
				tableState.spokenAtCurrentBet=[tableState.speakerIndex];
				break;

			default:
				return;
				break;
		}

		if (this.getNumSeatsByState(tableState,"playing")==1) {
			this.betsToPot(tableState);
			this.timeoutManager.clearTimeout(tableState.id);
			this.nextShowMuck(tableState);
		}

		else if (this.allHasSpoken(tableState)) {
			this.betsToPot(tableState);
			this.nextRound(tableState);
		}

		else {
			this.advanceSpeaker(tableState);

			if (!this.isPromptMeaningful(tableState))
				this.roundAction(tableState,"call");

			else {
				this.timeoutManager.setTimeout(tableState.id,30000);
			}
		}
	}

	async askBlindAction(tableState, action, value) {
		switch (action) {
			case "postBlind":
				this.speakerAction(tableState,this.getCurrentBlindLabel(tableState));

				this.makeBetForSpeaker(tableState,
					tableState.stake/this.getCurrentBlindDivider(tableState));

				this.advanceSpeaker(tableState);
				this.timeoutManager.setTimeout(tableState.id,30000);
				if (this.getNumSeatsWithBets(tableState)>=2)
					this.nextRound(tableState);

				break;

			case "leave":
				this.returnExcessiveBets(tableState);
				await this.removeUserFromSeat(tableState,tableState.speakerIndex);
				await this.finishGame(tableState);
				break;
		}
	}

	async showMuckAction(tableState,action) {
		switch (action) {
			case "show":
				tableState.seats[tableState.speakerIndex].state="show";
				this.timeoutManager.setTimeout(tableState.id,5000);
				break;

			case "muck":
				this.speakerAction(tableState,"muck");
				tableState.seats[tableState.speakerIndex].state="muck";
				this.nextShowMuck(tableState);
				break;
		}
	}

	async handleSpeakerAction(tableState, action, value) {
		switch (tableState.state) {
			case "round":
				await this.roundAction(tableState,action,value);
				break;

			case "askBlinds":
				await this.askBlindAction(tableState,action,value);
				break;

			case "showMuck":
				await this.showMuckAction(tableState,action);
				break;
		}
	}

	async handleTimeout(tableState) {
		switch (tableState.state) {
			case "idle":
				console.log("timeout in idle state!!! strange...");
				break;

			case "askBlinds":
				await this.askBlindAction(tableState,"leave");
				break;

			case "round":
				if (!this.getCostToCall(tableState))
					await this.roundAction(tableState,"call");

				else
					await this.roundAction(tableState,"fold");

				break;

			case "showMuck":
				if (tableState.seats[tableState.speakerIndex].state=="show")
					await this.nextShowMuck(tableState);

				else
					await this.showMuckAction(tableState,"muck");

				break;

			case "payout":
				await this.finishGame(tableState);
				break;

			case "finished":
				await this.finishWaitDone(tableState);
				break;
		}
	}
}

module.exports=TableController;