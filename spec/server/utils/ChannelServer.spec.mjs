import ChannelServer from "../../../src/server/utils/ChannelServer.js";
import ServerChannel from "../../../src/server/utils/ServerChannel.js";
import WebSocket from "ws";
import {waitEvent,delay} from "../../../src/server/utils/PromiseUtil.js";

describe("channel server",()=>{
	it("works",async ()=>{
		let called;

		async function auth(ws) {
			await delay(100);
			ws.channelId="test";
			called=true;
		}

		class Channel extends ServerChannel {
			async init() {
				await delay(100);
				this.initcalled=true;
			}

			async connect(ws) {
				expect(this.initcalled).toBeTrue();
				ws.send("hello");
			}

			async message(ws, message) {
				console.log("msg: "+message);
				await delay(100);
				console.log("done processing msg...");
				ws.send("hello");
			}
		}

		function channelFactory() {
			let c=new Channel();

			return c;
		}

		let server=new ChannelServer({
			port: 9997,
			authCallback: auth,
			channelClass: Channel
		});

		let ws=new WebSocket("ws://localhost:9997");
		await waitEvent(ws,"open");
		ws.send('{"x":"1"}');
		ws.send('{"x":"2"}');
		await waitEvent(ws,"message");
		ws.send('{"x":"3"}');
		ws.send('{"x":"4"}');

		await waitEvent(ws,"message");
		await waitEvent(ws,"message");

		expect(called).toBeTrue();
	});
});