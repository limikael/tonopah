const AsyncEventEmitter=require("./AsyncEventEmitter");
const WebSocket=require("ws");
const url=require("url");
const Mutex=require("./Mutex");

class ChannelServer extends AsyncEventEmitter {
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

	async aquireChannelMutex(channelId) {
		if (!this.channelsById[channelId])
			throw new Error("Channel doesn't exist: "+channelId);

		return this.channelsById[channelId].mutex.lock();
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

	onWsConnection=async (ws, req)=>{
		let channelId=ChannelServer.urlToChannelId(req.url);
		if (!this.channelsById[channelId]) {
			this.channelsById[channelId]={
				connections: [],
				mutex: new Mutex()
			};

			let unlock=await this.aquireChannelMutex(channelId);
			await this.emitAsync("channelCreated",channelId);
			unlock();
		}

		ws.channelId=channelId;
		ws.request=req;
		ws.parameters=ChannelServer.getUrlParameters(req.url);

		ws.send=(message)=>{
			let payload=JSON.stringify(message);
			WebSocket.prototype.send.call(ws,payload);
		}

		ws.onmessage=async (ev)=>{
			let message=JSON.parse(ev.data);
			let unlock=await this.aquireChannelMutex(channelId);
			await this.emitAsync("message",ws,message);
			unlock();
		}

		ws.onerror=ws.onclose=async (ev)=>{
			let unlock=await this.aquireChannelMutex(channelId);
			let index=this.channelsById[channelId].connections.indexOf(ws);
			this.channelsById[channelId].connections.splice(index,1);

			await this.emitAsync("disconnect",ws);

			if (this.channelsById[channelId].connections.length==0) {
				await this.emitAsync("channelDeleted",channelId);
				delete this.channelsById[channelId];
			}

			unlock();
		}

		this.channelsById[channelId].connections.push(ws);

		let unlock=await this.aquireChannelMutex(channelId);
		await this.emitAsync("connect",ws);
		unlock();
	}
}

module.exports=ChannelServer;