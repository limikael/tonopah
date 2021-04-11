import ResyncServer from "../../../src/server/utils/ResyncServer.js";
import {waitEvent,delay} from "../../../src/server/utils/PromiseUtil.js";
import WebSocket from "ws";
import http from "http";
import EventEmitter from "events";

describe("ResyncServer",()=>{
	it("can accept connections",async ()=>{
		let server=new ResyncServer({port: 9999});
		let socket=new WebSocket("ws://localhost:9999");
		let emitter=new EventEmitter();
		let messageSpy=jasmine.createSpy();
		let connectSpy=jasmine.createSpy();
		let disconnectSpy=jasmine.createSpy();
		let timeoutSpy=jasmine.createSpy("timeout");

		server.setTimeout(()=>{
			timeoutSpy();
			emitter.emit("timeout");
		},100);

		server.on("connect",async (ws, req)=>{
			expect(ws).toBeInstanceOf(WebSocket);
			expect(req).toBeInstanceOf(http.IncomingMessage);
			await delay(300);
			expect(messageSpy).not.toHaveBeenCalled();
			connectSpy();
		});
		server.on("message",async (ws, message)=>{
			expect(ws).toBeInstanceOf(WebSocket);
			expect(message).toEqual("hello");

			await delay(200);
			expect(disconnectSpy).not.toHaveBeenCalled();
			expect(connectSpy).toHaveBeenCalled();
			messageSpy();
		});
		server.on("disconnect",async (ws)=>{
			expect(ws).toBeInstanceOf(WebSocket);

			await delay(100);
			expect(messageSpy).toHaveBeenCalled();
			expect(connectSpy).toHaveBeenCalled();
			disconnectSpy();
			emitter.emit("clientDisconnect");
		});
		await waitEvent(socket,"open");
		socket.send("hello");
		socket.close();
		await waitEvent(emitter,"clientDisconnect");
		server.close();

		await waitEvent(emitter,"timeout");

		expect(timeoutSpy).toHaveBeenCalled();
	});
});