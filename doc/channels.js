let channelServer=new ChannelServer(httpServer);

channelServer.on("createChannel",(path)=>{
	this.tableStates[path]=await backend.getTableData();
});

channelServer.on("deleteChannel",(path)=>{
	await backend.suspend(path,this.tableStates[path]);
	delete this.tableStates[path];
});

channelServer.on("connect",(connection)=>{
	connection.user=await backend.getUserByToken(connection.request.token);
});

channelServer.on("disconnect",(connection)=>{

});

channelServer.on("message",(connection, message)=>{

});

channelServer.getConnectionsByChannel(channel);

// ---

let timeoutManager=new TimeoutManager();
timeoutManager.setTimeout("table-1",30000);
timeoutManager.clearTimeout("table-1");
timeoutManager.on("timeout",(id)=>{

});

timeoutManager.getTimeLeft("table-1");
timeoutManager.getTotalTime("table-1");
timeoutManager.getTimeoutIdsByGlob("tournament/1/*")