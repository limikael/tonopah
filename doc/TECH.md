# Concepts

## ChannelServer

The channel server listens to a port and accepts websocket conections. It maintains a number of channels, identified by a path. 
Channels will be automatically created first time a socket is connected to it. I.e, if a socket conection has a path to a non-existent channel,
a new channel will be created. When sockets disconnect, they wil be removed from the channel. Each channel is only for maintaining a group of connections,
there is no state information associated with the channel.

```
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
```

## TimeoutManager

# Code
