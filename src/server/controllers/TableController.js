class TableController {
	sitInUser(tableState, seatIndex, user) {
		if (!tableState.seats[seatIndex].user)
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