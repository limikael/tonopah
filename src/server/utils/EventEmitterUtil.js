export async function emitEx(emitter, ev, ...args) {
	let listeners=emitter.listeners(ev);

	for (let listener of listeners)
		await listener.apply(undefined,args);
}

export default {
	emitEx
}
