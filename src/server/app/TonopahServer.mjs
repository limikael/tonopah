import http from "http";
import WsExtraServer from "../../utils/WsExtraServer.js";
import Backend from "./Backend.js";
import MockBackend from "./MockBackend.js";
import WebSocket from "ws";
import CashGame from "./CashGame.mjs";
import ArrayUtil from "../../utils/ArrayUtil.js";

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
		console.log("Stopping server...");

		for (let id of Object.keys(this.cashGameById)) {
			let cashGame=this.cashGameById[id];
			cashGame.off("done",this.onCashGameDone);
			console.log("Suspending table: "+cashGame.id);
			await cashGame.suspend();
		}

		process.exit(0);
	}

	async run() {
		if (this.options.mock)
			this.backend=new MockBackend();

		else if (this.options["wp-backend"])
			this.backend=new Backend(
				this.options["wp-backend"]+
					"/wp-admin/admin-ajax.php?action=tonopah",
				this.options.key
			);

		else
			this.backend=new Backend(
				this.options.backend,
				this.options.key
			);

		if (this.options.clean) {
			await this.clean();
			return;
		}

		this.httpServer=http.createServer();
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
