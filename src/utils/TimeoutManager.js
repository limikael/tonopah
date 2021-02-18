const EventEmitter=require("events");
const {performance}=require('perf_hooks');

class TimeoutManager extends EventEmitter {
	constructor() {
		super();
		this.timeoutsById={};
	}

	setTimeout(id, delay) {
		this.clearTimeout(id);

		this.timeoutsById[id]={
			timeout: setTimeout(this.onTimeout.bind(this,id),delay),
			started: performance.now(),
			totalTime: delay
		}
	}

	onTimeout(id) {
		this.clearTimeout(id);
		this.emit("timeout",id);
	}

	clearTimeout(id) {
		if (this.timeoutsById[id]) {
			clearTimeout(this.timeoutsById[id].timeout);
			delete this.timeoutsById[id];
		}
	}

	getTotalTime(id) {
		if (!this.timeoutsById[id])
			return undefined;

		return this.timeoutsById[id].totalTime;
	}

	getTimeLeft(id) {
		if (!this.timeoutsById[id])
			return undefined;

		let t=this.timeoutsById[id];
		return t.started+t.totalTime-performance.now();
	}
}

module.exports=TimeoutManager;