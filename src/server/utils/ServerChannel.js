import Mutex from "./Mutex.js";

export default class ServerChannel {
	constructor() {
		this.mutex=new Mutex();
	}

	addConnection(ws) {
		this.mutex.critical(async ()=>{
			await this.connect(ws);

			ws.onmessage=async (ev)=>{
				await this.mutex.critical(async ()=>{
					await this.message(ws, ev.data);
				});
			}

			for (let ev of ws.earlyMessages) {
				await this.message(ws, ev.data);
			}
		});
	}

	init() {}
	connect(ws) {}
	disconnect(ws) {}
	message(ws, message) {}
}