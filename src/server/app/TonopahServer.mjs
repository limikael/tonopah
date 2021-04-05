import http from "http";
import WsExtraServer from "../../utils/WsExtraServer.js";
import Backend from "./Backend.js";
import MockBackend from "./MockBackend.js";
import WebSocket from "ws";
import CashGame from "./CashGame.mjs";
import Tournament from "./Tournament.mjs";
import ArrayUtil from "../../utils/ArrayUtil.js";
import ApiProxy from "../../utils/ApiProxy.js";
import SimpleLogger from "simple-node-logger";
import LoggerUtil from "../../utils/LoggerUtil.js";
import path from "path";
import fs from "fs";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export default class TonopahServer {
	constructor(options) {
		this.options=options;
		this.gameById={};
	}

	getSettingsError() {
		let haveBackend=false;
		if (this.options.backend || this.options["wp-backend"])
			haveBackend=true;

		if (!haveBackend && !this.options.mock)
			return "Need backend url or mock!!!";

		if (this.options.clean) {
			if (this.options.port)
				return "Can't use both clean and port";

			return;
		}

		if (!this.options.port)
			return "Need port!!!";
	}

	onWsConnection=async (ws, req)=>{
		if (this.stopping) {
			ws.close();
			return;
		}

		WsExtraServer.decorateWebSocket(ws,req);

		try {
			let data=await this.backend.fetch({
				call: "getUserInfoByToken",
				token: ws.parameters.token
			});

			ws.user=data.user;
		}

		catch (e) {
			console.log("Error getting user: "+String(e));
			ws.close();
			return;
		}

		console.log("connection with token: "+ws.parameters.token+" user: "+ws.user);

		if (ws.parameters.gameId) {
			let id=ws.parameters.gameId;

			if (!this.gameById[id]) {
				let t;

				switch (ws.parameters.gameType) {
					case "cashgame":
						t=new CashGame(id, this.backend);
						break;

					case "tournament":
						t=new Tournament(id, this.backend);
						break;

					default:
						console.log("bad game type: "+ws.parameters.getType);
						ws.close();
						break;
				}

				t.on("done",this.onGameDone);
				this.gameById[id]=t;
			}

			this.gameById[id].addConnection(ws);
		}

		else {
			console.log("not connecting to a cashgame or tournament");
			ws.close();
			return;
		}
	}

	onGameDone=(game)=>{
		console.log("game done: "+game.id);
		game.off("done",this.onGameDone);
		delete this.gameById[game.id];
	}

	async clean() {
		throw new Error("not used...");
	}

	onStop=async ()=>{
		if (this.stopping)
			return;

		this.stopping=true;
		console.info("Stopping server...");

		for (let id of Object.keys(this.gameById)) {
			let game=this.gameById[id];
			game.off("done",this.onGameDone);
			console.log("Suspending game: "+game.id);
			await game.suspend();
		}

		console.info("All games suspended, clean exit.");

		process.nextTick(()=>{
			if (this.logWriter) {
				this.logWriter.write("\n");
				this.logWriter.end(()=>{
					process.exit(0);
				});
			}

			else
				process.exit(0);
		});
	}

	async apiStatus() {
		const __dirname = dirname(fileURLToPath(import.meta.url));
		let pkg=JSON.parse(fs.readFileSync(__dirname+"/../../../package.json"));

		return {
			version: pkg.version,
			ok: 1
		};
	}

	apiKill=async (params)=>{
		if (params.key!=this.options.key)
			throw new Error("Wrong api key");

		if (!this.gameById[params.id]) {
			console.log("Can't kill, game not loaded: "+params.id);
			return {
				ok: 1,
				message: "Game is not running"
			}
		}

		await this.gameById[params.id].kill();

		return {
			ok: 1,
			message: "killed"
		}
	}

	async run() {
		this.simpleLogger=new SimpleLogger();
		this.simpleLogger.createConsoleAppender();

		if (this.options.log) {
			let file=path.normalize(this.options.log);
			const opts={
				flags:'a',
				encoding:'utf8'
			};

			this.logWriter=fs.createWriteStream(file,opts);
			this.simpleLogger.createFileAppender({
				writer: this.logWriter,
				logFilePath: "_dummy_not_used_"
			});
		};

		this.logger=this.simpleLogger.createLogger();
		this.logger.setLevel("debug");
		LoggerUtil.installToConsole(this.logger);

		if (this.options.log)
			console.log("Logging to: "+this.options.log);

		if (this.options.mock) {
			console.log("Using mocked backend.");
			this.backend=new MockBackend();
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

		if (this.options.clean) {
			await this.clean();
			return;
		}

		this.apiProxy=new ApiProxy({
			status: this.apiStatus,
			kill: this.apiKill
		});

		this.httpServer=http.createServer(this.apiProxy.handleCall);
		this.wsServer=new WebSocket.Server({
			server: this.httpServer
		});
		this.wsServer.on("connection",this.onWsConnection);

		this.httpServer.listen(this.options.port);

		process.on('SIGTERM',this.onStop);
		process.on('SIGINT',this.onStop);

		console.log("Listening to "+this.options.port);
	}
}
