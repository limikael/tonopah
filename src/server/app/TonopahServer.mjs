import http from "http";
import Backend from "./Backend.js";
import MockBackend from "./MockBackend.js";
import MockContent from "./MockContent.js";
import ChannelServer from "../utils/ChannelServer.js";
import ArrayUtil from "../../utils/ArrayUtil.js";
import ApiProxy from "../utils/ApiProxy.js";
import GameManager from "../game/GameManager.mjs";
import TonopahApi from "./TonopahApi.js";
import Logger from "../utils/Logger.js";
import BotConnection from "../game/BotConnection.mjs";

export default class TonopahServer {
	constructor(options) {
		this.options=options;
	}

	getSettingsError() {
		let haveBackend=false;
		if (this.options.backend || this.options["wp-backend"])
			haveBackend=true;

		if (!haveBackend && !this.options.mock)
			return "Need backend url or mock!!!";

		if (!this.options.port)
			return "Need port!!!";
	}

	onStop=async ()=>{
		if (this.stopping)
			return;

		console.info("Stopping server...");
		this.stopping=true;

		this.channelServer.stop();
		try {
			await this.channelServer.notifyAllChannels("suspend");
		}

		catch (e) {
			console.error("Error suspending games...");
			console.log(e);
		}

		console.info("Exit cleanup complete, exiting.");
		await this.logger.flush();
		process.exit(0);
	}

	async getTotalNumConnections() {
		let numConnections=await this.channelServer.notifyAllChannels("getNumConnections");
		let totalNumConnections=numConnections.reduce((a,b)=>a+b,0);
		return totalNumConnections;
	}

	async getNumGames() {
		let numConnections=await this.channelServer.notifyAllChannels("getNumConnections");

		return numConnections.length;
	}

	handleRequest=(req, res)=>{
		if (this.apiProxy.canHandle(req)) {
			this.apiProxy.handleCall(req,res);
			return;
		}

		if (this.mockContent) {
			if (this.mockContent.handleRequest(req,res))
				return;
		}

		res.statusCode=404;
		res.end("Unknown request");
	}

	async run() {
		this.started=Date.now();

		this.logger=new Logger(this.options.log);
		this.logger.install();

		if (this.options.log)
			console.log("Logging to: "+this.options.log);

		if (this.options.mock) {
			console.log("Using mocked backend and content.");
			this.backend=new MockBackend();
			this.mockContent=new MockContent();
		}

		else {
			let url=this.options.backend;
			if (this.options["wp-backend"])
				url=this.options["wp-backend"]+
					"/wp-admin/admin-ajax.php?action=tonopah"

			console.log("Using backend: "+url);
			if (this.options.key)
				console.log("Using a backend key.");

			else
				console.log("Warning: No backend key, very insecure.");

			this.backend=new Backend(url,this.options.key);
		}

		this.api=new TonopahApi(this);
		this.apiProxy=new ApiProxy(this.api);

		this.gameManager=new GameManager(this.backend);

		this.httpServer=http.createServer(this.handleRequest);
		this.channelServer=new ChannelServer({
			server: this.httpServer,
			authCallback: this.gameManager.authenticate,
			channelFactory: this.gameManager.loadGame
		});

		this.httpServer.listen(this.options.port);

		process.on('SIGTERM',this.onStop);
		process.on('SIGINT',this.onStop);

		console.log("Listening to "+this.options.port);

		if (this.options["bot-game-id"]) {
			let numBots=2;
			let botGameId=this.options["bot-game-id"];

			console.log("Running "+numBots+" bots on: "+botGameId);
			for (let i=0; i<numBots; i++) {
				let botConnection=new BotConnection({
					botNum: i,
					gameId: botGameId
				});

				this.channelServer.onConnection(botConnection,"bot");
			}
		}

		if (this.options.mock) {
			console.info("**");
			console.info("**  Mocked mode, visit: http://localhost:"+this.options.port+"/");
			console.info("**");
		}
	}
}
