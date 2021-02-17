const http=require("http");
const ChannelServer=require("../../utils/ChannelServer");
//const TonopahController=require("../controllers/TonopahController");

class TonopahServer {
	constructor(options) {
		this.options=options;
	}

	getSettingsError() {
		if (!this.options.port)
			return "Need port!!!";
	}

	onChannelCreated=async (id)=>{
		console.log("new channel");
	}

	run() {
		this.httpServer=http.createServer();
		this.channelServer=new ChannelServer({
			server: this.httpServer
		});

		this.channelServer.on("channelCreated",this.onChannelCreated);

		this.httpServer.listen(this.options.port);
		console.log("Listening to "+this.options.port);
	}
}

module.exports=TonopahServer;