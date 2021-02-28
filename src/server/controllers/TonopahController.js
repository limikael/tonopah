class TonopahController {
	constructor(server) {
		this.server=server;
		this.backend=server.backend;
		this.timeoutManager=server.timeoutManager;
	}

	async applyTableSateConfiguration(tableState, data) {
		if (data.status!="publish") {
			await this.backend.fetch({
				call: "saveCashGameTableState",
				tableId: tableState.id,
				tableState: "",
				runState: ""
			});

			throw new Error("Table status: "+data.status);
		}

		tableState.stake=data.stake;
		tableState.minSitInAmount=data.minSitInAmount;
		tableState.maxSitInAmount=data.maxSitInAmount;
		tableState.currency=data.currency;
	}

	load=async (id)=>{
		let data=await this.backend.fetch({
			call: "getCashGame",
			tableId: id
		});

		if (data.runState=="running") {
			console.error("Table is already running: "+id);
			throw new Error("Already running");
		}

		let tableState;
		try {
			tableState=JSON.parse(data.tableState);
		}

		catch (e) {
			//console.log("Table state not defined on load");
		}

		if (!tableState)
			tableState=PokerState.createPokerState(data);

		if (tableState.state=="idle") {
			await this.applyTableSateConfiguration(tableState,data);
			this.checkStart(tableState);
		}

		await this.saveRunningTableState(tableState);

		return tableState;
	}

	async saveRunningTableState(tableState) {
		await this.backend.fetch({
			call: "saveCashGameTableState",
			tableId: tableState.id,
			tableState: JSON.stringify(tableState),
			runState: "running"
		});
	}

	/*suspend=async (id, tableState)=>{
		this.timeoutManager.clearTimeout(tableState.id);

		await this.backend.fetch({
			call: "saveCashGameTableState",
			tableId: tableState.id,
			tableState: JSON.stringify(tableState),
			runState: "suspended"
		});
	}*/

	message=async (tableState, user, message)=> {
		if (this.isUserSpeaker(tableState,user))
			await this.handleSpeakerAction(tableState,message.action,message.value);

		switch (message.action) {
			case "seatJoin":
				await this.sitInUser(tableState,message.seatIndex,user);
				break;

			case "dialogOk":
				await this.confirmSitInUser(tableState,user,message.value);
				break;

			case "dialogCancel":
				await this.cancelSitInUser(tableState,user);
				break;
		}
	}

	timeout=async (tableState)=>{
		await this.handleTimeout(tableState);
	}

	disconnect=async (tableState, user)=>{
		if (this.server.isUserConnected(tableState.id,user))
			return;

		let seatIndex=this.getSeatIndexByUser(tableState,user);
		if (seatIndex<0)
			return;

		if (tableState.seats[seatIndex].state=="available" ||
				tableState.state=="idle") {
			await this.backend.fetch({
				call: "leaveCashGame",
				tableId: tableState.id,
				user: tableState.seats[seatIndex].user,
				amount: tableState.seats[seatIndex].chips
			});
			
		}
			await this.removeUserFromSeat(tableState,seatIndex);
	}
}

module.exports=TonopahController;