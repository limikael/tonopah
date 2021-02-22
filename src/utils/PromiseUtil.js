class PromiseUtil {
	static async delay(millis) {
		return new Promise((resolve, reject)=>{
			setTimeout(resolve,millis);
		});
	}

	static async logError(promise) {
		try {
			await promise;
		}

		catch (e) {
			console.error("Warning: "+String(e));
		}
	}
}

module.exports=PromiseUtil;
