const EventEmitter=require("events");

class AsyncEventEmitter extends EventEmitter {
	async emitAsync(event, ...params) {
		for (let listener of this.listeners(event)) {
			await listener.call(this,...params)
		}
	}
}

module.exports=AsyncEventEmitter;
