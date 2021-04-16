export default class Vec {
	constructor(a,b) {
		if (Array.isArray(a)) {
			this.x=a[0];
			this.y=a[1];
		}

		else if (typeof a=="object") {
			this.x=a.x;
			this.y=a.y;
		}

		else {
			this.x=a;
			this.y=b;
		}
	}

	sub(v) {
		return new Vec(this.x-v.x,this.y-v.y);
	}
}