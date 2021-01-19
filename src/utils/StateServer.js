const WebSocket=require("ws");
const querystring=require("querystring");
const url=require("url");

class StateServerChannel {
	constructor(stateServer, id) {
		this.stateServer=stateServer;
		this.state={};
		this.connections=[];
	}

	setState(state) {
		this.state=state;
	}

	getState() {
		return this.state;
	}

	addConnection(socket, user) {
		console.log("connecting, user="+user);

		socket.user=user;
		this.connections.push(socket);
		this.sendStateToConnection(socket);
		socket.addEventListener("message",this.onSocketMessage);
		socket.addEventListener("close",this.onSocketClose);
		socket.addEventListener("error",this.onSocketClose);
	}

	sendStateToConnection(ws) {
		let state={...this.state};
		let presentedState=this.stateServer.presenter(this.state,ws.user);
		let s=JSON.stringify(presentedState);
		ws.send(s);
	}

	sendState() {
		for (let connection of this.connections)
			this.sendStateToConnection(connection);
	}

	onSocketMessage=(ev)=>{
		let connection=ev.target;
		let message=JSON.parse(ev.data);
		this.stateServer.messageHandler(this.state,connection.user,message._,message);
		this.sendState();
	}

	onSocketClose=(ev)=>{
		let connection=ev.target;
		let index=this.connections.indexOf(connection);

		connection.removeEventListener("message",this.onSocketMessage);
		connection.removeEventListener("close",this.onSocketClose);
		connection.removeEventListener("error",this.onSocketClose);

		if (index>=0)
			this.connections.splice(index,1);

		console.log("disconnecting, user="+connection.user+", index="+index+" connections="+this.connections.length);
	}
}

class StateServer {
	constructor(options) {
		this.options=options;

		this.wsServer=new WebSocket.Server({
			server: this.options.server
		});

		this.wsServer.on("connection",this.onWsConnection);

		this.channelsById={};

		this.stateLoader=()=>{throw new Error("no state loader")};
		this.stateSuspender=()=>{throw new Error("no state suspender")};
		this.authenticator=()=>{throw new Error("no authenticator")};
		this.presenter=()=>{throw new Error("no presenter")};
		this.messageHandler=()=>{throw new Error("no mesage handler")};
		this.timeoutHandler=()=>{throw new Error("no timeout handler")};
	}

	setStateLoader(stateLoader) {
		this.stateLoader=stateLoader;
	}

	setStateSuspender(stateSuspender) {
		this.stateSuspender=stateSuspender;
	}

	setAuthenticator(authenticator) {
		this.authenticator=authenticator;
	}

	setPresenter(presenter) {
		this.presenter=presenter;
	}

	setMessageHandler(messageHandler) {
		this.messageHandler=messageHandler;
	}

	setTimeoutHandler(timeoutHandler) {
		this.timeoutHandler=timeoutHandler;
	}

	onWsConnection=async (ws, req)=>{
		let params={...querystring.parse(url.parse(req.url).query)};
		let user=await this.authenticator(params.token);

		if (!this.channelsById[params.channel]) {
			let state=await this.stateLoader(params.channel);
			let channel=new StateServerChannel(this,params.channel);
			channel.setState(state);
			this.channelsById[params.channel]=channel;
		}

		let channel=this.channelsById[params.channel];
		channel.addConnection(ws,user);
	}
}

module.exports=StateServer;