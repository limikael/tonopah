import AsyncState from "../../src/utils/AsyncState.mjs";

describe("AsyncState",()=>{
	it("can apply state changes",async ()=>{
		let m=new AsyncState();

		await m.apply(()=>{
			return {
				a: 1
			};
		});

		expect(m.state.a).toEqual(1);
	});
});