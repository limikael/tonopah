class WsPingPong {
	constructor(ws) {
		if (ws.readyState!=1)
			throw new Error("Only for connected sockets.");

		this.ws=ws;
		this.ws.addEventListener("message",this.onMessage);
		this.delay=5000;

		this.pingTimeout=setTimeout(this.onPingTimeout,this.delay);
	}

	onMessage=(ev)=>{
		if (ev.data=="PING")
	}

	onPingTimeout=()=>{
		if (this.ws.readyState!=2) {
			this.detach();
			return;
		}

		this.pingTimeout=null;
		Websocket.prototype.send.call(this.ws,"PING");
		this.pongTimeout=setTimeout(this.onPongTimeout,this.delay);
	}

	onPongTimeout=()=>{
		console.log("pong timeout!");

1		this.pongTimeout=null;

		let ev=new Event("error");

		if (this.ws.onerror)
			this.ws.onerror(ev);

		this.ws.dispatchEvent(ev)
	}

	detach() {
		if (this.pingTimeout)
			clearTimeout(this.pingTimeout);

		if (this.pongTimeout)
			clearTimeout(this.pongTimeout);
	}
}