import CurrencyFormatter from "../../src/utils/CurrencyFormatter.mjs";

describe("CurrencyFormatter",()=>{
	it("can format amounts",()=>{
		let formatter;

		formatter=new CurrencyFormatter({
			divisorPlaces: 2,
			symbol: "mBTC"
		});

		expect(formatter.format(120)).toEqual("1.2 mBTC");
	});
});