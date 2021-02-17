const EventEmitter=require("events");
const WebSocket=require("ws");

class ChannelServer extends EventEmitter {
	constructor(options) {
		super();

		this.options=options;
		this.channelsById={};

		this.wsServer=new WebSocket.Server(this.options);
		this.wsServer.on("connection",this.onWsConnection);
	}

	onWsConnection(ws, req) {
		let url=req.url;

		console.log("connection to: "+url);
	}
}

module.exports=ChannelServer;