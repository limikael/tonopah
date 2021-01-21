class TableController {
	isUserSeatedAtTable(tableState, user) {
		for (let seat of tableState.seats)
			if (seat.user==user)
				return true;

		return false;
	}

	sitInUser(tableState, seatIndex, user) {
		if (!tableState.seats[seatIndex].user &&
				!this.isUserSeatedAtTable(tableState,user))
			tableState.seats[seatIndex].user=user;

		/*if (!tableState.gameRunning && this.getNumberOfSitInUsers(tableState)>=2)
			this.playGame(tableState);*/
	}

/*	getGameCurrentStateUser(tableState) {

	}

	playTurn(tableState) {
		currentUser=this.getGameCurrentStateUser(tableState);

		this.stateServer.promptUser(tableState.id,currentUser,30000);
	}*/
}

module.exports=TableController;