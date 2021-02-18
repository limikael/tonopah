const EventEmitter=require("events");
const WebSocket=require("ws");
const url=require("url");

class ChannelServer extends EventEmitter {
	constructor(options) {
		super();

		this.options=options;
		this.channelsById={};

		this.wsServer=new WebSocket.Server(this.options);
		this.wsServer.on("connection",this.onWsConnection);
	}

	getConnectionsByChannel(channelId) {
		return this.channelsById[channelId].connections;
	}

	static urlToChannelId(u) {
		let parts=[];
		for (let s of url.parse(u).pathname.split("/"))
			if (s)
				parts.push(s);

		return parts.join("/");
	}

	static getUrlParameters(u) {
		return Object.fromEntries(new URLSearchParams(url.parse(u).query));
	}

	onWsConnection=(ws, req)=>{
		let channelId=ChannelServer.urlToChannelId(req.url);
		if (!this.channelsById[channelId]) {
			this.channelsById[channelId]={
				connections: []
			};

			this.emit("channelCreated",channelId);
		}

		ws.channelId=channelId;
		ws.request=req;
		ws.parameters=ChannelServer.getUrlParameters(req.url);

		ws.send=(message)=>{
			let payload=JSON.stringify(message);
			WebSocket.prototype.send.call(ws,payload);
		}

		ws.onmessage=(ev)=>{
			let message=JSON.parse(ev.data);
			this.emit("message",ws,message);
		}

		this.channelsById[channelId].connections.push(ws);
		this.emit("connect",ws);
	}
}

module.exports=ChannelServer;