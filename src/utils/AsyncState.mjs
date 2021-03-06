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

		try {
			this.state=await f(this.state);
		}

		catch (e) {
			this.finalize();
		}

		unlock();
	}
}
