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
		for (let connection of this.channelServer.getConnectionsByChannel(channelId)) {
			let tableState=JSON.parse(JSON.stringify(this.tableStateById[channelId]));
			let presented=this.controller.present(tableState,connection.user);
			connection.send(presented);
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

		console.log("channel deleted: "+channelId);
		await this.controller.suspend(state);
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
		if (!connection.user)
			return;

		try {
			let tableState=this.tableStateById[connection.channelId];
			await this.controller.disconnect(tableState,connection.user);
			this.presentChannel(connection.channelId);
		}

		catch (e) {
			console.error(e);
			this.clearChannel(connection.channelId);
		}
	}

	onChannelMessage=async (connection, message)=>{
		try {
			let tableState=this.tableStateById[connection.channelId];
			await this.controller.message(tableState,connection.user,message);
			this.presentChannel(connection.channelId);
		}

		catch (e) {
			console.error(e);
			this.clearChannel(connection.channelId);
		}
	}

	onTimeout=async (channelId)=>{
		let unlock=await this.channelServer.aquireChannelMutex(channelId);

		try {
			let tableState=this.tableStateById[channelId];
			await this.controller.timeout(tableState);
			this.presentChannel(channelId);
		}

		catch (e) {
			console.error(e);
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

	run() {
		if (this.options.mock)
			this.backend=new MockBackend();

		else
			this.backend=new Backend(this.options.backend);

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