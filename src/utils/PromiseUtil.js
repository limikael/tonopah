class PromiseUtil {
	static async delay(millis) {
		return new Promise((resolve, reject)=>{
			setTimeout(resolve,millis);
		});
	}
}

module.exports=PromiseUtil;
