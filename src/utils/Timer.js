import EventEmitter from "events";
import {performance} from "perf_hooks";

export default class Timer extends EventEmitter {
	constructor() {
		super();
	}

	onTimeout=()=>{
		this.timeoutStarted=null;
		this.timeoutDuration=null;
		this.timeout=null;
		this.emit("timeout");
	}

	setTimeout(millis) {
		this.clearTimeout();
		this.timeoutStarted=performance.now();
		this.timeoutDuration=millis;
		this.timeout=setTimeout(this.onTimeout,millis);
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
			clearTimeout(this.timeout);
			this.timeout=null;
		}
	}
}