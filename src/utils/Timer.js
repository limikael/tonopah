import EventEmitter from "events";
import {performance} from "perf_hooks";
import {emitEx} from "./EventEmitterUtil.js";

export default class Timer extends EventEmitter {
	constructor(mainLoop) {
		super();

		this.mainLoop=mainLoop;

		if (!this.mainLoop)
			this.mainLoop=global;

		if (!this.mainLoop)
			this.mainLoop=window;
	}

	onTimeout=async ()=>{
		this.timeoutStarted=null;
		this.timeoutDuration=null;
		this.timeout=null;
		await emitEx(this,"timeout");
	}

	setTimeout(millis) {
		this.clearTimeout();
		this.timeoutStarted=performance.now();
		this.timeoutDuration=millis;
		this.timeout=this.mainLoop.setTimeout(this.onTimeout,millis);
	}

	setTimeoutAt(stamp) {
		let delay=stamp-Date.now();
		if (delay<0)
			delay=0;

		this.setTimeout(delay);
	}

	getTimeLeft() {
		if (!this.timeout)
			return null;

		return (
			this.timeoutStarted+
			this.timeoutDuration-
			performance.now()
		);
	}

	clearTimeout() {
		if (this.timeout) {
			this.timeoutStarted=null;
			this.timeoutDuration=null;
			this.mainLoop.clearTimeout(this.timeout);
			this.timeout=null;
		}
	}
}