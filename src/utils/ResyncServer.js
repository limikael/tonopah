import WebSocket from "ws";
import Mutex from "./Mutex.js";
import EventEmiter from "events";
import ArrayUtil from "./ArrayUtil.js";

export default class ResyncServer extends EventEmiter {
	constructor(options) {
		super();

		this.options=options;
		this.server=new WebSocket.Server(options);
		this.server.on("connection",this.onConnection);
		this.mutex=new Mutex();
		this.timeouts=[];
	}

	close() {
		this.server.close();
	}

	onConnection=(ws, req)=>{
		ws.onmessage=(ev)=>{
			this.critical(async ()=>{
				await this.emitEx("message",ws,ev.data);
			});
		};

		ws.onclose=ws.onerror=()=>{
			ws.onclose=ws.onerror=ws.onmessage=null;
			this.critical(async ()=>{
				await this.emitEx("disconnect",ws);
			});
		};

		this.critical(async ()=>{
			await this.emitEx("connect",ws,req);
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
		return timeout;
	}

	clearTimeout(timeout) {
		ArrayUtil.remove(this.timeouts,timeout);
		clearTimeout(timeout);
	}

	async lock() {
		return await this.mutex.lock();
	}

	async critical(f) {
		let res, unlock=await this.lock();

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
		let listeners=this.listeners(ev);

		for (let listener of listeners)
			await listener.apply(undefined,args);
	}
}