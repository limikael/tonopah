const AsyncEventEmitter=require("./AsyncEventEmitter");
const WebSocket=require("ws");
const url=require("url");
const Mutex=require("./Mutex");
const PromiseUtil=require("./PromiseUtil");

class ChannelServer extends AsyncEventEmitter {
	constructor(options) {
		super();

		this.options=options;
		this.channelsById={};

		this.wsServer=new WebSocket.Server(this.options);
		this.wsServer.on("connection",this.onWsConnection);
	}

	removeChannel(channelId) {
		if (!this.channelsById[channelId])
			throw new Error("Channel doesn't exist: "+channelId);

		for (let ws of this.channelsById[channelId].connections)
			this.closeWebsocket(ws);

		delete this.channelsById[channelId];
	}

	getChannelIds() {
		let res=[];

		for (let id in this.channelsById)
			res.push(id);

		return res;
	}

	getConnectionsByChannel(channelId) {
		if (!this.channelsById[channelId])
			throw new Error("Channel doesn't exist: "+channelId);

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

	closeWebsocket(ws) {
		ws.onerror=null;
		ws.onclose=null;
		ws.onmessage=null;
		ws.close();
	}

	close() {
		for (let id in this.channelsById) {
			let connections=this.getConnectionsByChannel(id);
			for (let ws of connections)
				this.closeWebsocket(ws);
		}

		this.wsServer.close();
	}

	async deleteChannelIfEmpty(channelId) {
		if (!this.channelsById[channelId])
			return;

		if (this.channelsById[channelId].connections.length==0) {
			await PromiseUtil.logError(this.emitAsync("channelDeleted",channelId));
			delete this.channelsById[channelId];
		}
	}

	removeConnection(ws) {
		if (!this.channelsById[ws.channelId])
			return;

		let index=this.channelsById[ws.channelId].connections.indexOf(ws);
		if (index>=0)
			this.channelsById[ws.channelId].connections.splice(index,1);
	}

	onWsConnection=async (ws, req)=>{
		let channelId=ChannelServer.urlToChannelId(req.url);
		if (!channelId) {
			this.closeWebsocket(ws);
			return;
		}

		let unlock;
		if (this.channelsById[channelId])
			unlock=await this.aquireChannelMutex(channelId);

		if (!this.channelsById[channelId]) {
			if (unlock)
				unlock();

			this.channelsById[channelId]={
				connections: [],
				mutex: new Mutex()
			};

			unlock=await this.aquireChannelMutex(channelId);

			try {
				await this.emitAsync("channelCreated",channelId);
			}

			catch (e) {
				console.log("Channel creation failed: "+channelId+": "+String(e));
				delete this.channelsById[channelId];
				unlock();
				ws.close();
				return;
			}
		}

		ws.channelId=channelId;
		ws.request=req;
		ws.parameters=ChannelServer.getUrlParameters(req.url);

		ws.send=(message)=>{
			let payload=JSON.stringify(message);
			WebSocket.prototype.send.call(ws,payload);
		}

		ws.onmessage=async (ev)=>{
			let message;
			try {
				message=JSON.parse(ev.data);
			}

			catch (e) {
				console.error("Unable to parse message json, ignoring...");
				return;
			}

			let unlock=await this.aquireChannelMutex(channelId);
			await PromiseUtil.logError(this.emitAsync("message",ws,message));
			unlock();
		}

		ws.onerror=ws.onclose=async (ev)=>{
			let unlock=await this.aquireChannelMutex(channelId);
			this.removeConnection(ws);
			await PromiseUtil.logError(this.emitAsync("disconnect",ws));
			await this.deleteChannelIfEmpty(channelId);
			unlock();
		}

		this.channelsById[channelId].connections.push(ws);
		try {
			await this.emitAsync("connect",ws);
		}

		catch (e) {
			console.log("Connection failed: "+String(e));
			this.removeConnection(ws);
			this.closeWebsocket(ws);
			await this.deleteChannelIfEmpty(channelId);
			unlock();
		}

		unlock();
	}
}

module.exports=ChannelServer;