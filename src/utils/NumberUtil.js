export default class NumberUtil {
	static safeParseInt(s) {
		return (parseInt(s)||0);
	}
}