import CashGame from "./CashGame.mjs";
import Tournament from "./Tournament.mjs";
import {getReqParams} from "../utils/HttpUtil.js";

export default class GameManager {
	constructor(backend) {
		this.backend=backend;
	}

	loadGame=async (id)=>{
		let conf=await this.backend.fetch({
			call: "aquireGame",
			id: id
		});

		let game;
		switch (conf.type) {
			case "cashgame":
				game=new CashGame(conf,this.backend);
				break;

			case "tournament":
				game=new Tournament(conf,this.backend);
				break;

			default:
				throw new Error("Unknown game type");
		}

		if (!game.id || game.id!=id)
			throw new Error("Sanity check failed, not same id");

		return game;
	}

	authenticate=async (ws, req)=>{
		let params;

		if (req=="bot") {
			if (ws.user[0]!="#")
				throw new Error("Bot usernames must begin with #");

			params=ws.params;
		}

		else {
			params=getReqParams(req);
			let data=await this.backend.fetch({
				call: "getUserInfoByToken",
				token: params.token
			});

			ws.user=data.user;
		}

		ws.channelId=params.gameId;
	}
}
