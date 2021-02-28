const http=require("http");
const ChannelServer=require("../../utils/ChannelServer");
const TimeoutManager=require("../../utils/TimeoutManager");
const PromiseUtil=require("../../utils/PromiseUtil");
const TonopahController=require("../controllers/TonopahController");
const Backend=require("./Backend");
const MockBackend=require("./MockBackend");

class TonopahServer {
	constructor(options) {
		this.options=options;
		this.tableStateById={};
	}

	getSettingsError() {
		if (!this.options.port)
			return "Need port!!!";

		if (!this.options.backend && !this.options.mock)
			return "Need backend url or mock!!!";
	}

	presentChannel(channelId) {
		let state=this.tableStateById[channelId];
		let connections=this.channelServer.getConnectionsByChannel(channelId);
		let timeLeft=this.timeoutManager.getTimeLeft(channelId);

		for (let connection of connections) {
			let p=PokerPresenter.present(state,connection.user,timeLeft);
			connection.send(p);
		}
	}

	clearChannel(channelId) {
		this.channelServer.removeChannel(channelId);
		this.timeoutManager.clearTimeout(channelId);
		delete this.tableStateById[channelId];
	}

	onChannelCreated=async (channelId)=>{
		console.log("channel created: "+channelId);
		this.tableStateById[channelId]=await this.controller.load(channelId);
	}

	onChannelDeleted=async (channelId)=>{
		let state=this.tableStateById[channelId];
		delete this.tableStateById[channelId];

		this.timeoutManager.clearTimeout(tableState.id);

		await this.backend.fetch({
			call: "saveCashGameTableState",
			tableId: channelId,
			tableState: JSON.stringify(state),
			runState: "suspended"
		});

		console.log("channel deleted: "+channelId);
	}

	onChannelConnect=async (connection)=>{
		let data=await this.backend.fetch({
			call: "getUserInfoByToken",
			token: connection.parameters.token
		});

		connection.user=data.user;
		console.log("New connection by user: "+connection.user);

		this.presentChannel(connection.channelId);
	}

	onChannelDisconnect=async (connection)=>{
		console.log("Disconnect: "+connection.user);
		try {
			if (!connection.user)
				return;

			let tableState=this.tableStateById[connection.channelId];

			if (this.server.isUserConnected(connection.channelId,user))
				return;

			let seatIndex=PokerUtil.getSeatIndexByUser(tableState,user);
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

				tableState=PokerState.removeUserFromSeat(tableState,seatIndex);
			}

			this.presentChannel(connection.channelId);
		}

		catch (e) {
			console.error(e);
			this.clearChannel(connection.channelId);
		}
	}

	async channelAction(channelId, action, value) {
		this.timeoutManager.clearTimeout(channelId);

		let tableState=this.tableStateById[channelId];
		tableState=PokerState.action(tableState,action,value);
		this.tableStateById[channelId]=tableState;

		let timeout=PokerUtil.getTimeout(tableState);
		if (timeout)
			this.timeoutManager.setTimeout(channelId,timeout);

		this.presentChannel(channelId);
	}

	onChannelMessage=async (connection, message)=>{
		try {
			let tableState=this.tableStateById[connection.channelId];

			if (PokerUtil.isUserSpeaker(tableState,connection.user))
				this.channelAction(connection.channelId,message.action,message.value);

			// DO SIT IN AND STUFF...
		}

		catch (e) {
			console.error(e);
			this.clearChannel(connection.channelId);
		}
	}

	onTimeout=async (channelId)=>{
		let unlock=await this.channelServer.aquireChannelMutex(channelId);

		try {
			this.channelAction(channelId);
		}

		catch (e) {
			console.error("Error during timeout: "+String(e));
			//console.log(e);
			this.clearChannel(channelId);
		}

		unlock();
	}

	isUserConnected(channelId, user) {
		for (let connection of this.channelServer.getConnectionsByChannel(channelId))
			if (connection.user==user)
				return true;

		return false;
	}

	onStop=async ()=>{
		if (this.stopping)
			return;

		this.stopping=true;
		console.log("Stopping server...");

		let ids=this.channelServer.getChannelIds();
		this.channelServer.close();

		for (let id of ids) {
			console.log("Suspending table: "+id);
			await PromiseUtil.logError(this.controller.suspend(this.tableStateById[id]));
		}

		process.exit(0);
	}

	async clean() {
		let res=await this.backend.fetch({
			call: "getCashGames"
		});

		for (let tableData of res.tables) {
			if (tableData.runState=="running") {
				console.log("Cleaning "+tableData.id+": "+tableData.name);
				await this.backend.fetch({
					call: "saveCashGameTableState",
					tableId: tableData.id,
					tableState: "",
					runState: ""
				});
			}
		}
	}

	async run() {
		if (this.options.mock)
			this.backend=new MockBackend();

		else
			this.backend=new Backend(this.options.backend);

		if (this.options.clean) {
			await this.clean();
			return;
		}

		this.timeoutManager=new TimeoutManager();
		this.timeoutManager.on("timeout",this.onTimeout);

		this.httpServer=http.createServer();
		this.channelServer=new ChannelServer({
			server: this.httpServer
		});

		this.channelServer.on("channelCreated",this.onChannelCreated);
		this.channelServer.on("channelDeleted",this.onChannelDeleted);
		this.channelServer.on("connect",this.onChannelConnect);
		this.channelServer.on("disconnect",this.onChannelDisconnect);
		this.channelServer.on("message",this.onChannelMessage);

		this.controller=new TonopahController(this);

		this.httpServer.listen(this.options.port);

		process.on('SIGTERM',this.onStop);
		process.on('SIGINT',this.onStop);

		console.log("Listening to "+this.options.port);
	}
}

module.exports=TonopahServer;