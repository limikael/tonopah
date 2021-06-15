import ChannelServer from "../../../src/server/utils/ChannelServer.js";
import ServerChannel from "../../../src/server/utils/ServerChannel.js";
import WebSocket from "ws";
import {waitEvent,delay} from "../../../src/server/utils/PromiseUtil.js";
import EventEmitter from "events";

describe("channel server",()=>{
	it("works",async ()=>{
		let called;
		let exitwait=new EventEmitter();

		async function auth(ws) {
			await delay(100);
			ws.channelId="test";
			called=true;
		}

		let channel;

		class Channel extends ServerChannel {
			async init() {
				await delay(100);
				this.initcalled=true;
				//throw new Error("fail");
				//this.exit();
				this.setTimeout(this.onTimeout,100);
				let t=this.setTimeout(this.onTimeout,100);

				/*expect(this.getTimeLeft(t)).toBeGreaterThan(0);
				expect(this.getTimeLeft(t)).toBeSmallerThan(0);*/
			}

			async onTimeout() {
				//console.log("timeout");
				await delay(100);
				//console.log("timeout done");
//				this.exit();
				expect(this).toEqual(channel);
			}

			async connect(ws) {
				expect(this.initcalled).toBeTrue();
				ws.send("hello");
				await delay(100);
				//throw new Error("fail");

				expect(this).toEqual(channel);
			}

			async disconnect(ws) {
				await delay(100);
				exitwait.emit("exit");
				expect(this).toEqual(channel);
			}

			async message(ws, message) {
				expect(message.m).toEqual("test");
				await delay(100);
				//console.log("done processing msg...");

/*				if (message=='{"x":"4"}')
					throw new Error("fail");*/

				ws.send({"test":"hello"});
				expect(this).toEqual(channel);
			}

			async notify(p, x) {
				//console.log("notification: "+p)
				expect(this).toEqual(channel);
				await delay(100);

				return "hello";
			}
		}

		async function channelFactory(channelId) {
			channel=new Channel();
			return channel;
		}

		let server=new ChannelServer({
			port: 9997,
			authCallback: auth,
			channelFactory: channelFactory
		});

		let ws=new WebSocket("ws://localhost:9997");
		let ws2=new WebSocket("ws://localhost:9997");
		await waitEvent(ws,"open");
		await waitEvent(ws2,"open");

		server.stop();

		ws.send('{"m":"test","x":"1"}');
		ws2.send('{"m":"test","x":"2"}');
		await waitEvent(ws,"message");
		await waitEvent(ws2,"message");
		expect(channel.connections.length).toEqual(2);

		expect(await server.notifyChannel("test","testing",1)).toEqual("hello");
		expect(await server.notifyAllChannels("testing",1)).toEqual(["hello"]);

		ws.send('{"m":"test","x":"3"}');
		ws.send('{"m":"test","x":"4"}');

		let ev=await waitEvent(ws,"message");
		expect(ev).toEqual(['{"test":"hello"}']);
		//console.log(ev);
		await waitEvent(ws,"message");

		ws.close();
		ws2.close();
		await waitEvent(exitwait,"exit");
		await waitEvent(exitwait,"exit");
		expect(channel.connections.length).toEqual(0);

		expect(called).toBeTrue();
	});
});