class CashGame {
	constructor(id, server) {
		this.id=id;
		this.mutex=new Mutex();
		this.wsGroup=new wsGroup();
		this.wsGroup.on("disconnect",this.onDiconnect);

		this.load();
	}

	async load() {
		let unlock=this.mutex.lock();

		this.table={};

		unlock();
	}

	addConnection(c) {
		this.wsGroup.addConnection(c);
	}

	onDisconnect=async (c)=>{
		if (!this.wsGroup.getNumConnections())
			this.wsGroup.close();

		let unlock=this.mutex.lock();
		let user=c.user;

		if (user && !this.isUserConnected(user)) {
			if (PokerUtil.getUserSeatState(this.table,user)=="available")
				this.table=PokerState.removeUser(user);
		}

		await this.removeIdleUsers(connection.channelId);

		await this.suspend();
		this.emit("done");
		unlock();
	}

	async action(action, value) {
		try {
			this.clearTimeout();
			this.table=PokerState.action(this.table,action,value);

			if (this.table.state=="idle")
				await this.doIdleCleanup();

			this.setTimeout(PokerUtil.getTimeout(this.table);
			this.present();
		}

		catch (e) {
			console.error("Error during action: "+String(e));
			console.log(e);
		}
	}

	async doIdleCleanup() {
		await this.removeIdleUsers();

		let data=await this.backend.fetch({
			call: "getCashGame",
			tableId: this.id
		});

		if (data.status!="publish") {
			await this.backend.fetch({
				call: "saveCashGameTableState",
				tableId: this.id,
				tableState: "",
				runState: ""
			});

			return;
		}

		this.table=PokerState.applyConfiguration(this.table,data);

		await this.backend.fetch({
			call: "saveCashGameTableState",
			tableId: id,
			tableState: JSON.stringify(this.table),
			runState: "running"
		});

		this.table=PokerState.checkStart(this.table);
	}

	onConnectionMessage(...) {
		user=...;
		message=...;

		let unlock=this.mutex.lock();
		if (PokerUtil.isUserSpeaker(this.table,user))
			await this.action(message.action,message.value);

		else

		unlock();
	}

	onTimeout() {
		let unlock=this.mutex.lock();
		await this.action();
		unlock();
	}

	removeIdleUsers() {
		if (this.state!="idle")
			return;

		let users=PokerUtil.getSeatedUsers(this.state);
		for (let user of users) {
			if (PokerUtil.getUserSeatState(this.table,user)!="available") {
				if (!this.isUserConnected(user) ||
						!PokerUtil.getUserChips(this.table,user) ||
						PokerUtil.getUserSeatState(this.table,user)=="leave") {
					await this.backend.fetch({
						call: "leaveCashGame",
						tableId: this.id,
						user: user,
						amount: PokerUtil.getUserChips(this.table,user)
					});

					this.table=PokerState.removeUser(this.table,user);
				}
			}
		}
	}

	present() {
		for (let c of this.connections)
			c.send(PokerState.present(this.state))
	}

	isUserConnected(user) {
		for (let connection of this.connections)
			if (connection.user==user)
				return true;

		return false;
	}
}