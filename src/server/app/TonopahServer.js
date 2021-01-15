const http=require("http");
const StateServer=require("../../utils/StateServer");

class TonopahServer {
	constructor(options) {
		this.options=options;
	}

	getSettingsError() {
		if (!this.options.port)
			return "Need port!!!";
	}

	async loadState(id) {
		console.log("loading state: "+id);

		let seats=[];
		for (let i=0; i<10; i++)
			seats.push({
				user: ""
			});

		return {
			seats: seats
		};
	}

	async authenticate(token) {
		return "micke";
	}

	present(state, user) {
		return state;
	}

	handleMessage(state, user, message, params) {
		state.seats[params.seatIndex].user=user;
		console.log("got message: "+message);
	}

	run() {
		this.httpServer=http.createServer();
		this.stateServer=new StateServer({
			server: this.httpServer,
			loadState: this.loadState,
			authenticate: this.authenticate,
			present: this.present,
			message: this.handleMessage
		});

		this.httpServer.listen(this.options.port);
		console.log("Listening to "+this.options.port);
	}
}

module.exports=TonopahServer;