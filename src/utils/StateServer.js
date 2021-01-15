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
		socket.user=user;
		this.connections.push(socket);
		this.sendStateToConnection(socket);
		socket.addEventListener("message",this.onSocketMessage);
	}

	sendStateToConnection(ws) {
		let state={...this.state};
		let presentedState=this.stateServer.options.present(this.state,ws.user);
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
		this.stateServer.options.message(this.state,connection.user,message._,message);
		this.sendState();
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
	}

	onWsConnection=async (ws, req)=>{
		let params={...querystring.parse(url.parse(req.url).query)};
		let user=await this.options.authenticate(params.token);

		if (!this.channelsById[params.channel]) {
			let state=await this.options.loadState(params.channel);
			let channel=new StateServerChannel(this,params.channel);
			channel.setState(state);
			this.channelsById[params.channel]=channel;
		}

		let channel=this.channelsById[params.channel];
		channel.addConnection(ws,user);
	}
}

module.exports=StateServer;