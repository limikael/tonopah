import http from "http";
import Backend from "./Backend.js";
import MockBackend from "./MockBackend.js";
import ResyncServer from "../utils/ResyncServer.js";
import ArrayUtil from "../../utils/ArrayUtil.js";
import ApiProxy from "../utils/ApiProxy.js";
import GameManager from "./GameManager.mjs";
import Logger from "../utils/Logger.js";
import {delay} from "../utils/PromiseUtil.js";
import {dirname} from 'path';
import {fileURLToPath} from 'url';

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

		await this.gameManager.suspend();
		this.resyncServer.close();

		console.info("Exit cleanup complete, exiting...");
		await this.logger.flush();
		process.exit(0);
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

		this.gameManager.killGame(params.id);

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
		this.logger=new Logger(this.options.log);
		this.logger.install();

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

		this.gameManager=new GameManager(this.resyncServer, this.backend);
		this.gameManager.install();

		this.httpServer.listen(this.options.port);

		process.on('SIGTERM',this.onStop);
		process.on('SIGINT',this.onStop);

		console.log("Listening to "+this.options.port);
	}
}
