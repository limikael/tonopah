# Concepts

## ChannelServer

The channel server listens to a port and accepts websocket conections. It maintains a number of channels, identified by a path. 
Channels will be automatically created first time a socket is connected to it. I.e, if a socket conection has a path to a non-existent channel,
a new channel will be created. When sockets disconnect, they wil be removed from the channel. Each channel is only for maintaining a group of connections,
there is no state information associated with the channel.

```
// Create a channel server. Pass a httpServer that does the actual listening.
let channelServer=new ChannelServer(httpServer);

// A new channel got created by the first connection to the path.
//If the app decides that the path is illegal,the listener can throw an exception.
channelServer.on("channelCreated",(path)=>{
	// path might be "/tables/1"
});

// A channel got deleted because there are no connections to it.
channelServer.on("channelDeleted",(path)=>{
});

// A user connected to an existing channel. If the channel did not exist, it will 
// have been created and the "channelCreated" event will have been emitted.
// The conection is a WebSocket with the extra property "channel" which has
// the channel id where the connection connected.
channelServer.on("connect",(connection)=>{
	connection.channel // <-- this is the channel path.
});

channelServer.on("disconnect",(connection)=>{

});

// Handle a message from a connection. To get the channel, use connection.channel
channelServer.on("message",(connection, message)=>{

});

// Get all current connections for a channel.
channelServer.getConnectionsByChannel(channel);
```

The event handling is a little special. Each channel has a mutex to ensure that race do not conditions occur if message
handling or data fetching happens asyncronously. I.e. this code is possible, and if there are other messages
on ariving on the channel they will be queued until the async function completes:

```
channelServer.on("message",async (connection, message)=>{
  await someLongOperantionOnTheChannel(connection.channel);
}
```

## TimeoutManager

# Code
