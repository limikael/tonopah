import WebSocket from "ws";
import Mutex from "./Mutex.js";
import EventEmiter from "events";

export default class ResyncServer extends EventEmiter {
	constructor(options) {
		this.options=options;
		this.server=new WebSocket.Server(options);
		this.server.on("connection",this.onConnection);
		this.mutex=new Mutex();
		this.timeouts=[];
	}

	onConnection=(ws, req)=>{
		ws.onmessage=this.onMessage.bind(this,ws);
		ws.onclose=ws.onerror=this.onClose.bind(this,ws);
		this.critical(async ()=>{
			await this.emitEx("connect",ws,req);
		});
	}

	onClose=(ws)=>{
		ws.onclose=ws.onerror=ws.onmessage=null;
		this.critical(async ()=>{
			await this.emitEx("disconnect",ws);
		});
	}

	onMessage=(ws, data)=>{
		this.critical(async ()=>{
			await this.emitEx("message",ws,data);
		});
	}

	setTimeout(fn, delay) {
		let timeout=setTimeout(()=>{
			this.critical(async ()=>{
				if (this.timeouts.indexOf(timeout)<0)
					return;

				ArrayUtil.remove(this.timeouts,timeout);
				await fn();
			});
		},delay);

		this.timeouts.push(timeout);
	}

	clearTimeout(timeout) {
		ArrayUtil.remove(this.timeouts,timeout);
		clearTimeout(timeout);
	}

	async lock() {
		return await this.mutex.lock();
	}

	async critical(f) {
		let unlock=await this.lock();
		let res;

		try {
			res=await f();
		}

		catch (e) {
			unlock();
			throw e;
		}

		unlock();
		return res;
	}

	async emitEx(ev, ...args) {
		let listeners=this.listners(ev);

		for (let listener of listners)
			await listener.apply(undefined,args);
	}
}