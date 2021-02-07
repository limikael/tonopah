let {state, send}=useRemoteState("ws://blabla.com");


let stateServer=new StateServer(httpServer);
stateServer.on("connection",(con)=>{

});

stateServer.on("message",(con, message)=>{

});

con.setState();

