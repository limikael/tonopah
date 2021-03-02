import http from "http";
import ChannelServer from "../../utils/ChannelServer.js";
import WsExtraServer from "../../utils/WsExtraServer.js";
import PromiseUtil from "../../utils/PromiseUtil.js";
import Backend from "./Backend.js";
import MockBackend from "./MockBackend.js";
import WebSocket from "ws";
import CashGame from "./CashGame.mjs";

/*import * as PokerState from "../../../src/server/poker/PokerState.mjs";
import * as PokerUtil from "../../../src/server/poker/PokerUtil.mjs";*/

export default class TonopahServer {
	constructor(options) {
		this.options=options;
		this.cashGameById={};
	}

	getSettingsError() {
		if (!this.options.port)
			return "Need port!!!";

		if (!this.options.backend && !this.options.mock)
			return "Need backend url or mock!!!";
	}

	onStop=async ()=>{
		if (this.stopping)
			return;

		this.stopping=true;
		console.log("Stopping server...");

		let ids=this.channelServer.getChannelIds();
		this.channelServer.close();

		for (let id of ids) {
			console.log("Suspending table: "+id);

			await PromiseUtil.logError(this.backend.fetch({
				call: "saveCashGameTableState",
				tableId: id,
				tableState: JSON.stringify(this.tableStateById[id]),
				runState: "suspended"
			}));
		}

		process.exit(0);
	}

	onWsConnection=async (ws, req)=>{
		WsExtraServer.decorateWebSocket(ws,req);

		try {
			let data=await this.backend.fetch({
				call: "getUserInfoByToken",
				token: ws.parameters.token
			});

			ws.user=data.user;
		}

		catch (e) {
			console.log("error getting user...");
			ws.close();
			return;
		}

		if (ws.parameters.tableId) {
			let id=ws.parameters.tableId;

			if (!this.cashGameById[id]) {
				let t=new CashGame(id, this.backend);
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

	async run() {
		if (this.options.mock)
			this.backend=new MockBackend();

		else
			this.backend=new Backend(this.options.backend);

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

		/*process.on('SIGTERM',this.onStop);
		process.on('SIGINT',this.onStop);*/

		console.log("Listening to "+this.options.port);
	}
}
