import WebSocket from "ws";
import Mutex from "./Mutex.js";
import EventEmiter from "events";
import ArrayUtil from "./ArrayUtil.js";
import {emitEx} from "./EventEmitterUtil.js";

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
			this.mutex.critical(async ()=>{
				await emitEx(this,"message",ws,ev.data);
			});
		};

		ws.onclose=ws.onerror=()=>{
			ws.onclose=ws.onerror=ws.onmessage=null;
			this.mutex.critical(async ()=>{
				await emitEx(this,"disconnect",ws);
			});
		};

		this.mutex.critical(async ()=>{
			await emitEx(this,"connect",ws,req);
		});
	}

	setTimeout(fn, delay) {
		let timeout=setTimeout(()=>{
			this.mutex.critical(async ()=>{
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
}