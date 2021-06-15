import WebSocket from "ws";
import Mutex from "./Mutex.js";

export default class ChannelServer {
	constructor(options) {
		this.options=options;
		this.server=new WebSocket.Server(options);
		this.server.on("connection",this.onConnection);
		this.channelsById={};
		this.mutex=new Mutex();
	}

	onConnection=async (ws, req)=>{
		if (this.stopped) {
			ws.close();
			return;
		}

		ws.earlyMessages=[];
		ws.onmessage=(ev)=>{
			ws.earlyMessages.push(ev);
		}

		if (this.options.authCallback) {
			try {
				await this.options.authCallback(ws, req);
			}

			catch (e) {
				console.error("Auth failed...");
				ws.close();
				return;
			}
		}

		if (!ws.channelId) {
			console.error("No channel");
			ws.close();
			return;
		}

		await this.mutex.critical(async ()=>{
			try {
				if (!this.channelsById[ws.channelId]) {
					this.channelsById[ws.channelId]=await this.options.channelFactory(ws.channelId);
					await this.channelsById[ws.channelId].initialize(this,ws.channelId);
				}

				if (!this.channelsById[ws.channelId])
					throw new Error("Channel went away while creating");

				await this.channelsById[ws.channelId].addConnection(ws);
			}

			catch (e) {
				console.error("Error accepting connection: "+e.message);
				ws.close();
			}
		});
	}

	removeChannel(channelId) {
		delete this.channelsById[channelId];
	}

	async notifyChannel(channelId, ...notification) {
		return await this.mutex.critical(async ()=>{
			return await this.channelsById[channelId].sendNotification(...notification);
		});
	}

	async notifyAllChannels(...notification) {
		return await this.mutex.critical(async ()=>{
			let promises=[];

			for (let channelId of Object.keys(this.channelsById))
				promises.push(this.channelsById[channelId].sendNotificationIfAlive(...notification));

			return await Promise.all(promises);
		});
	}

	stop() {
		this.stopped=true;
	}
}