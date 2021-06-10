import CashGame from "./CashGame.mjs";
import Tournament from "./Tournament.mjs";
import {getReqParams} from "../utils/HttpUtil.js";
import ResyncServer from "../utils/ResyncServer.js";

export default class GameManager {
	constructor(server, backend) {
		this.gameById={};

		this.server=server;
		this.backend=backend;
	}

	install() {
		this.server.on("connect",this.onConnect);
		this.server.on("message",this.onMessage);
		this.server.on("disconnect",this.onDisconnect);
	}

	uninstall() {
		this.server.off("connect",this.onConnect);
		this.server.off("message",this.onMessage);
		this.server.off("disconnect",this.onDisconnect);
	}

	async loadGame(id) {
		let conf=await this.backend.fetch({
			call: "aquireGame",
			id: id
		});

		let game;
		switch (conf.type) {
			case "cashgame":
				game=new CashGame(conf,this.backend,this.server);
				break;

			case "tournament":
				game=new Tournament(conf,this.backend,this.server);
				break;

			default:
				throw new Error("Unknown game type");
		}

		await game.init();

		if (!game.id || game.id!=id)
			throw new Error("Sanity check failed, not same id");

		game.on("exit",this.onGameExit);
		this.gameById[id]=game;
	}

	deleteGame(id) {
		let game=this.gameById[id];

		game.off("exit",this.onGameExit);
		game.finalize();
		delete this.gameById[id];
	}

	onGameExit=async (id)=>{
		this.deleteGame(id);
	}

	onConnect=async (ws, req)=>{
		let params;

		if (req=="bot") {
			if (ws.user[0]!="#")
				throw new Error("Bot usernames must begin with #");

			params=ws.params;
		}

		else {
			params=getReqParams(req);
			try {
				let data=await this.backend.fetch({
					call: "getUserInfoByToken",
					token: params.token
				});

				ws.user=data.user;
			}

			catch (e) {
				console.log("Error getting user: "+String(e));
				ResyncServer.closeConnection(ws);
				return;
			}
		}

		if (params.gameId) {
			if (!this.gameById[params.gameId]) {
				try {
					await this.loadGame(params.gameId);
				}

				catch (e) {
					console.log(e.stack);
					ResyncServer.closeConnection(ws);
					return;
				}
			}

			this.gameById[params.gameId].addConnection(ws);
			ws.game=this.gameById[params.gameId];
		}

		else {
			console.log("not connecting to a cashgame or tournament");
			ResyncServer.closeConnection(ws);
			return;
		}
	}

	onMessage=async (ws,message)=>{
		await this.gameCritical(ws.game.id,async ()=>{
			await ws.game.handleMessage(ws.user,JSON.parse(message));
		});
	}

	onDisconnect=async (ws)=>{
		await this.gameCritical(ws.game.id,async ()=>{
			await ws.game.removeConnection(ws);

			if (!ws.game.haveConnections()) {
				await ws.game.suspend();
				this.deleteGame(ws.game.id);
			}
		});
	}

	async gameCritical(id, fn) {
		try {
			await fn();
		}

		catch (e) {
			console.log(e.stack);
			this.deleteGame(id);
		}
	}

	killGame(id) {
		if (!this.gameById[id])
			throw new Error("game not loaded: "+id);

		this.deleteGame(id);
		console.log("Killed: "+id);
	}

	async reloadGameConf(id) {
		if (!this.gameById[id])
			throw new Error("game not loaded: "+id);

		let game=this.gameById[id];
		await game.reloadConf();
	}

	async suspend() {
		this.uninstall();

		let suspendPromises=[];
		for (let id of Object.keys(this.gameById)) {
			suspendPromises.push(this.gameById[id].suspend());
			this.deleteGame(id);
		}

		this.gameById={};

		try {
			await Promise.all(suspendPromises);
			console.info("All games suspended.");
		}

		catch (e) {
			console.error("Error suspending games.");
			console.log(e.stack);
		}
	}
}
