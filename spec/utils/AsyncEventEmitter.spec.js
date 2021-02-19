const AsyncEventEmitter = require("../../src/utils/AsyncEventEmitter");
const PromiseUtil = require("../../src/utils/PromiseUtil");

describe("AsyncEventEmitter", function() {
	it("can dispatch events",async ()=>{
		let e=new AsyncEventEmitter();
		let v;

		e.on("test",async(a,b)=>{
			await PromiseUtil.delay(100);
			v=b;
		});

		let o;

		class C {
			f=async()=>{
				expect(this).toBe(o);
			}
		}

		o=new C();
		e.on("test",o.f);

		let res=e.emitAsync("test",1,2);
		expect(v).toEqual(undefined);
		await res;
		expect(v).toEqual(2);
	});
});