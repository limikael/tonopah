import http from "http";
import WsExtraServer from "../../utils/WsExtraServer.js";
import Backend from "./Backend.js";
import MockBackend from "./MockBackend.js";
import WebSocket from "ws";
import CashGame from "./CashGame.mjs";
import ArrayUtil from "../../utils/ArrayUtil.js";
import ApiProxy from "../../utils/ApiProxy.js";
import SimpleLogger from "simple-node-logger";
import LoggerUtil from "../../utils/LoggerUtil.js";
import path from "path";
import fs from "fs";

export default class TonopahServer {
	constructor(options) {
		this.options=options;
		this.cashGameById={};
	}

	getSettingsError() {
		if (!this.options.port)
			return "Need port!!!";

		let haveBackend=false;
		if (this.options.backend || this.options["wp-backend"])
			haveBackend=true;

		if (!haveBackend && !this.options.mock)
			return "Need backend url or mock!!!";
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

		if (ws.parameters.cashGameId) {
			let id=ws.parameters.cashGameId;

			if (!this.cashGameById[id]) {
				let t=new CashGame(id, this.backend);
				t.on("done",this.onCashGameDone);
				this.cashGameById[id]=t;
			}

			this.cashGameById[id].addConnection(ws);
		}

		else {
			console.log("not connecting to a table...");
			ws.close();
			return;
		}

		console.log("connection with token: "+ws.parameters.token);
	}

	onCashGameDone=(cashGame)=>{
		console.log("cash game done: "+cashGame.id);
		cashGame.off("done",this.onCashGameDone);
		delete this.cashGameById[cashGame.id];
	}

	async clean() {
		let res=await this.backend.fetch({
			call: "getCashGames"
		});

		for (let tableData of res.tables) {
			if (tableData.runState=="running") {
				console.log("Cleaning "+tableData.id+": "+tableData.name);
				await this.backend.fetch({
					call: "saveCashGameTableState",
					tableId: tableData.id,
					tableState: "",
					runState: ""
				});
			}
		}
	}

	onStop=async ()=>{
		if (this.stopping)
			return;

		this.stopping=true;
		console.info("Stopping server...");

		for (let id of Object.keys(this.cashGameById)) {
			let cashGame=this.cashGameById[id];
			cashGame.off("done",this.onCashGameDone);
			console.log("Suspending table: "+cashGame.id);
			await cashGame.suspend();
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
		return {
			ok: 1
		};
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
			status: this.apiStatus
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
