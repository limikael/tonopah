let {state, send}=useRemoteState("ws://blabla.com");


let stateServer=new StateServer(httpServer);
stateServer.on("connection",(con)=>{

});

stateServer.on("message",(con, message)=>{

});

con.setState();

// ---

let group=new WebSocketGroup();

group.addWebSocket(socket);

group.on("message",(message, webSocket)=>{

});

group.send(message);

group.forEach((socket)=>{

});

// ---

class CashgameTable {
	constructor(state) {
		this.state=state;
		this.connectionGroup=new ConnectionGroup();
		this.connectionGroup.setMessageHandler(this.onMessage);
	}

	addConnection(connection) {
		this.connectionGroup.addConnection(connection);
	}

	async onMessage(connection, message) {
		
	}
}

table=new Table();
table.addSocket(socket);

// ---

tableManager=new TableManager();

tableManager.getTableById(id);

async loadTable(id) {
	let data=await fetch(blabla);
	return new Table(data);
}

getTableById(id) {
	if (this.tableById[id])
		return this.tableById[id];

	this.tableById[id]=this.loadTable(id);
}

// ---

let socketServer=new SocketServer(httpServer);
socketServer.on("connection",async (socket)=>{
	try {
		socket.user=await backend.getUser(socket.request.token);

		if (socket.request.query=="table") {
			let t=await tableManager.getTableById(socket.request.tableId)
			t.addConnection(socket);
		}
	}
});