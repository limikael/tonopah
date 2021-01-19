class TableController {
	sitInUser(tableState, seatIndex, user) {
		if (!tableState.seats[seatIndex].user)
			tableState.seats[seatIndex].user=user;
	}
}

module.exports=TableController;