import Mutex from "./Mutex.js";
import ArrayUtil from "../../utils/ArrayUtil.js";
import WebSocket from "ws";

export default class ServerChannel {
	constructor() {
		this.mutex=new Mutex();
		this.connections=[];
		this.timeouts=[];
	}

	async handleMessageEvent(ws, ev) {
		let data;
		try {
			data=JSON.parse(ev.data);
		}

		catch (e) {
			console.warn("Unable to parse JSON: "+e.message);
			return;
		}

		return await this.message(ws,data);
	}

	async addConnection(ws) {
		let superSend=ws.send;
		ws.send=function(data) {
			let dataJson=JSON.stringify(data);
			superSend.call(ws,dataJson);
		}

		await this.processCritical(async ()=>{
			this.connections.push(ws);
			await this.connect(ws);

			ws.onmessage=async (ev)=>{
				await this.processCritical(async ()=>{
					await this.handleMessageEvent(ws,ev);
				});
			}

			ws.onclose=ws.onerror=async (ev)=>{
				await this.processCritical(async ()=>{
					ArrayUtil.remove(this.connections,ws);
					await this.disconnect(ws);
				});
			}

			for (let ev of ws.earlyMessages) {
				await this.handleMessageEvent(ws,ev);
			}
		});
	}

	async initialize(channelServer, channelId) {
		this.channelServer=channelServer;
		this.channelId=channelId;

		await this.processCritical(async ()=>{
			await this.init();
		});
	}

	async processCritical(fn) {
		try {
			return await this.mutex.critical(async ()=>{
				if (this.exited)
					throw new Error("Zombie Poke");

				return await fn();
			});
		}

		catch (e) {
			console.error("** Caught channel error for: "+this.channelId);
			console.error(e.stack);
			this.exit();
			throw e;
		}
	}

	exit() {
		for (let c of this.connections) {
			c.onmessage=c.onerror=c.onclose=null;
			c.close();
		}

		this.connections=[];

		for (let t of this.timeouts)
			clearTimeout(t);

		this.timeouts=[];

		this.exited=true;
		this.channelServer.removeChannel(this.channelId);
	}

	async sendNotification(...params) {
		return await this.processCritical(async ()=>{
			return await this.notify(...params);
		});
	}

	setTimeout(fn, delay) {
		let timeout=setTimeout(()=>{
			this.processCritical(async ()=>{
				if (this.timeouts.indexOf(timeout)<0)
					return;

				ArrayUtil.remove(this.timeouts,timeout);
				await fn.bind(this)();
			});
		},delay);

		this.timeouts.push(timeout);
		return timeout;
	}

	clearTimeout(timeout) {
		ArrayUtil.remove(this.timeouts,timeout);
		clearTimeout(timeout);
	}

	init() {}
	connect(ws) {}
	disconnect(ws) {}
	message(ws, message) {}
	notify(...p) {}
}