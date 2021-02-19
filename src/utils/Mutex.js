function Mutex() {
	let current = Promise.resolve();
	this.lock = () => {
		let _resolve;
		const p = new Promise(resolve => {
			_resolve = () => resolve();
		});
		// Caller gets a promise that resolves when the current outstanding
		// lock resolves
		const rv = current.then(() => _resolve);
		// Don't allow the next request until the new promise is done
		current = p;
		// Return the new promise
		return rv;
	};
}

module.exports=Mutex;