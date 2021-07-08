import {dirname} from 'path';
import {fileURLToPath} from 'url';
import fs from "fs";

export default class TonopahApi {
	constructor(server) {
		this.server=server;
	}

	async status(params) {
		if (params.key!=this.server.options.key)
			throw new Error("Wrong api key");

		let response={};

		const __dirname = dirname(fileURLToPath(import.meta.url));
		let pkg=JSON.parse(fs.readFileSync(__dirname+"/../../../package.json"));
		response.version=pkg.version;

		if (params.loop) {
			let loopResponse=await this.server.backend.fetch({
				call: "status"
			});

			response.loop_blogname=loopResponse.blogname;
		}

		response.uptime=Math.round((Date.now()-this.server.started)/1000);
		response.num_games=await this.server.getNumGames();
		response.num_connections=await this.server.getTotalNumConnections();

		return response;
	}

	async killGame(params) {
		if (params.key!=this.server.options.key)
			throw new Error("Wrong api key");

		await this.server.channelServer.notifyChannel(params.id,"kill");
	}

	async reloadGameConf(params) {
		if (params.key!=this.server.options.key)
			throw new Error("Wrong api key");

		await this.server.channelServer.notifyChannel(params.id,"reloadConf");
	}
}