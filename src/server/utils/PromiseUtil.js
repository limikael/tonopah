export function delay(millis) {
	return new Promise((resolve,reject)=>{
		setTimeout(resolve,millis);
	});
}

export function waitEvent(o,ev) {
	return new Promise((resolve,reject)=>{
		o.once(ev,(...p)=>{
			resolve(p);
		});
	});
}

export default {delay,waitEvent};