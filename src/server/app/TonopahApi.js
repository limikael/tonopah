import {dirname} from 'path';
import {fileURLToPath} from 'url';
import fs from "fs";

export default class TonopahApi {
	constructor(server) {
		this.server=server;
	}

	async status() {
		const __dirname = dirname(fileURLToPath(import.meta.url));
		let pkg=JSON.parse(fs.readFileSync(__dirname+"/../../../package.json"));

		return {
			version: pkg.version,
			ok: 1
		};
	}

	kill=async (params)=>{
		if (params.key!=this.server.options.key)
			throw new Error("Wrong api key");

		this.server.gameManager.killGame(params.id);

		return {
			ok: 1,
			message: "killed"
		}
	}
}