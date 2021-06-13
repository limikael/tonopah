import WebSocket from "ws";

export default class ChannelServer {
	constructor(options) {
		this.options=options;
		this.server=new WebSocket.Server(options);
		this.server.on("connection",this.onConnection);
		this.channelsById={};
	}

	onConnection=async (ws, req)=>{
		ws.earlyMessages=[];
		ws.onmessage=(ev)=>{
			ws.earlyMessages.push(ev);
		}

		if (this.options.authCallback) {
			try {
				await this.options.authCallback(ws, req);
			}

			catch (e) {
				console.log("Auth failed...");
				ws.close();
				return;
			}
		}

		if (!ws.channelId) {
			console.log("No channel");
			ws.close();
			return;
		}

		if (!this.channelsById[ws.channelId]) {
			this.channelsById[ws.channelId]=new this.options.channelClass();
			await this.channelsById[ws.channelId].init();
		}

		this.channelsById[ws.channelId].addConnection(ws);
	}
}