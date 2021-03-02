class CashGame {
	constructor(id, backend) {
		this.wsGroup=new WsGroup();
		this.wsGroup.on("disconnect",this.onWsGroupDisconnect);
		this.load();
	}

	load() {
		this.critical(async ()=>{
			let data=await this.backend.fetch({
				call: "getCashGame",
				tableId: this.id
			});

			if (data.runState=="running") {
				console.error("Table is already running: "+channelId);
				throw new Error("Already running");
			}

			try {
				this.tableState=JSON.parse(data.tableState);
			}

			catch (e) {
				console.log("Table state not defined on load");
				if (data.status!="publish")
					throw new Error("Table not published");

				this.tableState=PokerState.createPokerState(data);
			}

			if (this.tableState.state=="idle")
				await this.enterIdleState();

			this.resetTimeout();
		});
	}

	onTimeout=()=>{
		this.critical(async ()=>{
			await this.action();
		});
	}

	onDisconnect=()=>{
		this.critical(async ()=>{
			this.cleanUpConnections();
		});
	}

	onMessage=(c, message)=>{
		this.critical(async ()=>{
			if (PokerUtil.isUserSpeaker(this.tableState,c.user))
				await this.action(message.action,message.value);

			switch (message.action) {
				case "seatJoin":
					let i=message.seatIndex;
					this.state=PokerState.reserveSeat(this.state,i,c.user);
					break;

				case "dialogCancel":
					this.state=PokerState.removeUser(this.state,c.user);
					break;

				case "dialogOk":
					await this.sitInUser(c.user,message.value);
					break;
			}
		});
	}

	async action(action, value) {
		this.clearTimeout();

		this.table=PokerState.action(this.table,action,value);
		if (this.table.state=="idle")
			await this.enterIdleState();

		this.resetTimeout();
	}

	enterIdleState() {
		let data=await this.backend.fetch({
			call: "getCashGame",
			tableId: this.id
		});

		if (data.status!="publish") {
			await this.removeAllUsers();
			await this.backend.fetch({
				call: "saveCashGameTableState",
				tableId: this.id,
				tableState: "",
				runState: ""
			});

			return;
		}

		this.table=PokerState.applyConfiguration(this.table,data);
		this.cleanUpConnections();

		await this.backend.fetch({
			call: "saveCashGameTableState",
			tableId: id,
			tableState: JSON.stringify(this.table),
			runState: "running"
		});

		this.table=PokerState.checkStart(this.table);
		this.resetTimeout();
	}

	async cleanUpConnections() {
		let users=PokerUtil.getReservingUsers(this.tableState);
		for (let user of users) {
			if (!this.isUserConnected(user))
				this.tableState=PokerState.removeUser(this.tableState,user);
		}

		if (this.tableState.state=="idle") {
			let users=PokerUtil.getSeatedUsers(this.tableState);
			for (let user of users) {
				if (PokerUtil.getUserSeatState(this.tableState,user)!="available") {
					if (!this.isUserConnected(user) ||
							!PokerUtil.getUserChips(this.tableState,user) ||
							PokerUtil.getUserSeatState(this.tableState,user)=="leave") {
						await this.backend.fetch({
							call: "leaveCashGame",
							tableId: channelId,
							user: user,
							amount: PokerUtil.getUserChips(this.tableState,user)
						});

						this.tableState=PokerState.removeUser(this.tableState,user);
					}
				}
			}
		}
	}
}