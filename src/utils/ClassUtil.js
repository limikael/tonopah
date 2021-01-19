class ClassUtil {
	static mixInClass(target, cls) {
		for (let method of Object.getOwnPropertyNames(cls.prototype)) {
			if (method!="constructor")
				target[method]=cls.prototype[method];
		}
	}
}

module.exports=ClassUtil;