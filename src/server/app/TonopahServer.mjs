import http from "http";
import {getReqParams} from "../../utils/HttpUtil.js";
import Backend from "./Backend.js";
import MockBackend from "./MockBackend.js";
import ResyncServer from "../../utils/ResyncServer.js";
import ArrayUtil from "../../utils/ArrayUtil.js";
import ApiProxy from "../../utils/ApiProxy.js";
import SimpleLogger from "simple-node-logger";
import LoggerUtil from "../../utils/LoggerUtil.js";
import {delay} from "../../utils/PromiseUtil.js";
import CashGame from "./CashGame.mjs";
import Tournament from "./Tournament.mjs";
import path from "path";
import fs from "fs";
import {dirname} from 'path';
import {fileURLToPath} from 'url';

async function loadGame(id, backend, mainLoop) {
	let conf=await backend.fetch({
		call: "aquireGame",
		id: id
	});

	let game;
	switch (conf.type) {
		case "cashgame":
			game=new CashGame(conf,backend,mainLoop);
			break;

		case "tournament":
			game=new Tournament(conf,backend,mainLoop);
			break;

		default:
			throw new Error("Unknown game type");
	}

	await game.init();

	if (!game.id || game.id!=id)
		throw new Error("Sanity check failed, not same id");

	return game;
}

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

		if (!this.options.port)
			return "Need port!!!";
	}

	onConnect=async (ws, req)=>{
		if (this.stopping) {
			ws.close();
			return;
		}

		let params=getReqParams(req);
		try {
			let data=await this.backend.fetch({
				call: "getUserInfoByToken",
				token: params.token
			});

			ws.user=data.user;
		}

		catch (e) {
			console.log("Error getting user: "+String(e));
			ws.close();
			return;
		}

		if (params.gameId) {
			if (!this.gameById[params.gameId]) {
				try {
					let game=await loadGame(
						params.gameId,
						this.backend,
						this.resyncServer
					);

					this.gameById[params.gameId]=game;
				}

				catch (e) {
					console.log(e.stack);
					ws.close();
					return;
				}
			}

			this.gameById[params.gameId].addConnection(ws);
			ws.game=this.gameById[params.gameId];
		}

		else {
			console.log("not connecting to a cashgame or tournament");
			ws.close();
			return;
		}
	}

	onMessage=async (ws,message)=>{
		await ws.game.handleMessage(ws.user,JSON.parse(message));
	}

	onDisconnect=async (ws)=>{
		await ws.game.removeConnection(ws);

		if (!ws.game.haveConnections()) {
			await ws.game.suspend();
			delete this.gameById[ws.game.id];
		}
	}

	onStop=async ()=>{
		if (this.stopping)
			return;

		this.stopping=true;
		console.info("Stopping server...");

		let suspendPromises=[];
		for (let id of Object.keys(this.gameById))
			suspendPromises.push(this.gameById[id].suspend());

		await Promise.all(suspendPromises);
		console.info("All games suspended, clean exit.");

		this.resyncServer.close();

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

	handleApiCall=(req, res)=>{
		this.resyncServer.mutex.critical(async ()=>{
			await this.apiProxy.handleCall(req, res);
		});
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

		this.apiProxy=new ApiProxy({
			status: this.apiStatus,
			kill: this.apiKill
		});

		this.httpServer=http.createServer(this.handleApiCall);
		this.resyncServer=new ResyncServer({
			server: this.httpServer
		});
		this.resyncServer.on("connect",this.onConnect);
		this.resyncServer.on("message",this.onMessage);
		this.resyncServer.on("disconnect",this.onDisconnect);

		this.httpServer.listen(this.options.port);

		process.on('SIGTERM',this.onStop);
		process.on('SIGINT',this.onStop);

		console.log("Listening to "+this.options.port);
	}
}
