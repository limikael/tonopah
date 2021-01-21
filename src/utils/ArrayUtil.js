class ArrayUtil {
	static range(to) {
		let a=[]
		for (let i=0; i<to; i++)
			a.push(i);

		return a;
	}
}

module.exports=ArrayUtil;
