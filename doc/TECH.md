# Concepts

The previous StateServer is separated into 3 components:

* ChannelServer - Maintains groups of WebSocket connections.
* TimeoutManager - Maintains timeouts to make sure they don't leak.
* The actual game states are just stored in an object.

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

The TimeoutManager maintains a number to timeouts identified by string ids. In order to avoid leaks, there is exactly one timeout per id.

```
let timeoutManager=new TimeoutManager();

// Set a timeout called myTimeout, if there is already a timeout with this id, it will be removed.
timeoutManager.setTimeout("myTimeout",30000);

// Remove a timeout.
timeoutManager.clearTimeout("table-1");

// Will be triggered on timeout.
timeoutManager.on("timeout",(id)=>{
  // ...
});

// These functions can be to get the time left, for sending to the client.
timeoutManager.getTimeLeft("myTimoeut"); // Get time left until timeout.
timeoutManager.getTotalTime("myTimeout"); // Get total time for the timeout.

// Get all timeout ids by glob.
timeoutManager.getTimeoutIdsByGlob("tournament/1/*")```
```

# Code

A game using the above would look something like this. The games are called "tables" because of poker, but there is nothing poker specific. They
could be called "rooms" or "boards" as well.

```
// The states for the tables, using path as key.
let tableStates={};

// Create the underlying http server for listening.
let httpServer=http.createServer();
httpServer.listen(8888);

// Create the channel server.
let channelServer=new ChannelServer(httpServer);

// The backend is used to communicate with stable storage (i.e. database).
let backend=new SomeBackendThatCanPerformRestfulApiCalls();

// Manage timeouts with a TimeoutManager.
let timeoutManager=new TimeoutManager();

// Each channel corresponds to a table. Fetch remote data when a table is connected to for the first time.
// Load the table data and set table state.
channelServer.on("channelCreated",async (path)=>{
  tablesStates[path]=await backend.get("getTableData/"+path);
});

// When a client connects, fetch user information from backend.
// Send current state to the clinet.
channelServer.on("connection",async (connection)=>{
  connection.user=await backend.get("getUsernameByToken",connection.req.params.token);

  let presented=presentTableStateTheWayAUserShouldSeeIt(tableStates[connection.channel],connection.user);
  connection.send(presented);
}

// Channel is empty of connections. Suspend the state and remove timeouts.
channelServer.on("channelDeleted",(path)=>{
  await backend.post("suspendTableData/"+path,tableStates[path]);
  timeoutManager.clearTimeout(path);
  delete tableStates[path];
});

// Send the table state to all connected clients for the table. Also send info about the 
// current timeout.
function presentTableState(path) {
  let state=tableStates[path];
  for (let connection of channelServer.getConnectionsForChannel(path)) {
    let presented=presentTableStateTheWayAUserShouldSeeIt(state,connection.user);
    presented.timeLeft=timeoutManager.getTimeLeft(path);
    presented.totalTime=timeoutManager.getTotalTime(path);
    connection.send(presented);
  }
}

// Handle messages. Call some game logic function to transform the state. Set up potential
// timeouts. Send the new presentaton of the state to all clients connected to the channel.
channelServer.on("message",async (connection,message)=>{
  let path=connection.path;
  tableStates[path]=await performSomeAdvancedGameLogic(tableStates[path],connection.user,message);
  if (weShouldWaitForSomeTimeoutBecauseOfTheState(tableStates[path]))
    timeoutManager.setTimeout(path,getTimeoutDependingOnGameState(tableState[path]);
  presentTableState(path);
});

// Handle timeouts.
timeoutManager.on("timeout",(path)=>{
  tableStates[path]=await performSomeAdvancedGameLogicDueToTimeout(tableStates[path]);
  presentTableState(path);
});
```
