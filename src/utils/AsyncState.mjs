import Mutex from "./Mutex.js";
import EventEmitter from "events";

export default class AsyncState extends EventEmitter {
	constructor() {
		super();
		this.state={};
		this.mutex=new Mutex();
		this.finalized=false;
	}

	isFinalized() {
		return this.finalized;
	}

	finalize() {
		this.finalized=true;
		this.state=null;
		this.emit("finalized");
	}

	async apply(f) {
		let unlock=await this.mutex.lock();
		if (this.finalized) {
			console.log("will not run critical section, already finalized");
			//console.log(f);
			unlock();
			return;
		}

		try {
			let s=await f(this.state);

			if (!this.finalized)
				this.state=s;
		}

		catch (e) {
			if (e.stack)
				console.error(e.stack);

			else
				console.error(String(e));

			this.finalize();
		}

		unlock();
	}
}
