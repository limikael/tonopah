export default class NumberUtil {
	static safeParseInt(s) {
		return (parseInt(s)||0);
	}

	static formatMillis(millis) {
		let secs=Math.round(millis/1000);
		if (secs<0)
			secs=0;

		let s = (secs % 60).toString();
		let m = (Math.floor(secs / 60) % 60).toString();
		let hr = (Math.floor(secs / (60 * 60))).toString();

		if (s.length < 2)
			s = "0" + s;

		if (m.length < 2)
			m = "0" + m;

		if (hr == "0")
			hr = "";

		else {
			if (hr.length < 2)
				hr = "0" + hr;

			hr += ":";
		}

		let text = hr + m + ":" + s;

		return text;
	}
}
