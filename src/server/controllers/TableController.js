class TableController {
	sitInUser(tableState, seatIndex, user) {
		console.log("server: "+this.server);
		tableState.seats[seatIndex].user=user;
	}
}

module.exports=TableController;