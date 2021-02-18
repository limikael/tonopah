const http=require("http");
const ChannelServer=require("../../utils/ChannelServer");
const TimeoutManager=require("../../utils/TimeoutManager");
const TonopahController=require("../controllers/TonopahController");

class TonopahServer {
	constructor(options) {
		this.options=options;
		this.tableStateById={};
	}

	getSettingsError() {
		if (!this.options.port)
			return "Need port!!!";
	}

	presentChannel(channelId) {
		for (let connection of this.channelServer.getConnectionsByChannel(channelId)) {
			let tableState=JSON.parse(JSON.stringify(this.tableStateById[channelId]));
			let presented=this.controller.present(tableState,connection.user);
			connection.send(presented);
		}
	}

	onChannelCreated=async (channelId)=>{
		this.tableStateById[channelId]=await this.controller.load(channelId);
	}

	onChannelConnect=async (connection)=>{
		connection.user=await this.controller.authenticate(connection.parameters.token);
		this.presentChannel(connection.channelId);
	}

	onChannelMessage=async (connection, message)=>{
		let tableState=this.tableStateById[connection.channelId];
		this.controller.message(tableState,connection.user,message);
		this.presentChannel(connection.channelId);
	}

	onTimeout=(channelId)=>{
		let tableState=this.tableStateById[channelId];
		this.controller.timeout(tableState);
		this.presentChannel(channelId);
	}

	isUserConnected(channelId, user) {
		for (let connection of this.channelServer.getConnectionsByChannel(channelId))
			if (connection.user==user)
				return true;

		return false;
	}

	run() {
		this.timeoutManager=new TimeoutManager();
		this.timeoutManager.on("timeout",this.onTimeout);

		this.httpServer=http.createServer();
		this.channelServer=new ChannelServer({
			server: this.httpServer
		});

		this.channelServer.on("channelCreated",this.onChannelCreated);
		this.channelServer.on("connect",this.onChannelConnect);
		this.channelServer.on("message",this.onChannelMessage);

		this.controller=new TonopahController(this);

		this.httpServer.listen(this.options.port);
		console.log("Listening to "+this.options.port);
	}
}

module.exports=TonopahServer;