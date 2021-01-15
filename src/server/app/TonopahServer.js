class TonopahServer {
	constructor() {
		this.stateServer=new StateServer();

p=new ServerStateStore();
p.setLoader(loadState);
p.setSuspender(suspendState);
p.setPresenter(presentState);
p.setMessageHandler(messageHandler);
p.setTimeoutHandler(timeoutHandler);
		
	}

	run() {
		this.stateServer.listen(8080);
	}
}