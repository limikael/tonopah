const PromiseUtil = require("../../src/utils/PromiseUtil");

describe("PromiseUtil", function() {
	it("can log errors",async ()=>{
		async function testError() {
			throw new Error("bla");
		}

		await PromiseUtil.logError(testError());
	});
});