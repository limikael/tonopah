const http=require("http");
const StateServer=require("../../utils/StateServer");
const TonopahController=require("../controllers/TonopahController");

class TonopahServer {
	constructor(options) {
		this.options=options;
	}

	getSettingsError() {
		if (!this.options.port)
			return "Need port!!!";
	}

	run() {
		this.httpServer=http.createServer();
		this.stateServer=new StateServer({
			server: this.httpServer
		});

		this.controller=new TonopahController(this);
		this.stateServer.setStateLoader(this.controller.load);
		this.stateServer.setAuthenticator(this.controller.authenticate);
		this.stateServer.setPresenter(this.controller.present);
		this.stateServer.setMessageHandler(this.controller.message);
		this.stateServer.setTimeoutHandler(this.controller.timeout);

		//this.stateServer.setStateSuspender(this.suspend);

		/*this.stateServer.setTimeout(channelId,this.timeout,30000);
		this.stateServer.clearTimeout(channelId);*/

		this.httpServer.listen(this.options.port);
		console.log("Listening to "+this.options.port);
	}
}

module.exports=TonopahServer;