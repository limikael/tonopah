import ArrayUtil from "../../utils/ArrayUtil.js";
import ServerChannel from "../utils/ServerChannel.js";

export default class MoneyGame extends ServerChannel {
	constructor(conf, backend) {
		super();

		console.info(conf.type+"("+conf.id+"): Creating.");

		this.conf=conf;
		this.backend=backend;
		this.id=conf.id;
		this.gameState=this.conf.gameState;
	}

	async cleanExit() {
		console.info(this.conf.type+"("+this.conf.id+"): Exit.");

		await this.removeAllUsers();
		await this.backend.fetch({
			call: "syncGame",
			id: this.id,
			gameStateJson: JSON.stringify(null),
			aquireCode: this.conf.aquireCode,
			release: true
		});

		this.exit();
	}

	async addUser(user, amount) {
		console.log("adding user "+user+" with amount: "+amount);

		await this.backend.fetch({
			call: "addGameUser",
			id: this.id,
			user: user,
			amount: amount,
			aquireCode: this.conf.aquireCode
		});
	}

	async removeUser(user) {
		await this.backend.fetch({
			call: "removeGameUser",
			id: this.id,
			user: user,
			aquireCode: this.conf.aquireCode
		});
	}

	async removeAllUsers() {
		await this.backend.fetch({
			call: "removeAllGameUsers",
			id: this.id,
			aquireCode: this.conf.aquireCode
		});
	}

	async updateUserBalances(balances, rake) {
		let params={
			call: "syncGame",
			id: this.id,
			userBalancesJson: JSON.stringify(balances),
			aquireCode: this.conf.aquireCode
		};

		if (rake)
			params["rake"]=rake;

		await this.backend.fetch(params);
	}

	async saveGameState() {
		await this.backend.fetch({
			call: "syncGame",
			id: this.id,
			gameStateJson: JSON.stringify(this.gameState),
			aquireCode: this.conf.aquireCode
		});
	}

	async reloadConf() {
		console.info(this.conf.type+"("+this.conf.id+"): Reloading.");

		this.conf=await this.backend.fetch({
			call: "getGame",
			id: this.id,
			aquireCode: this.conf.aquireCode
		});
	}

	async suspend() {
		console.info(this.conf.type+"("+this.conf.id+"): Suspend.");

		await this.backend.fetch({
			call: "syncGame",
			id: this.id,
			gameStateJson: JSON.stringify(this.gameState),
			aquireCode: this.conf.aquireCode,
			release: true
		});

		this.exit();
	}

	async notify(notification) {
		switch (notification) {
			case "getNumConnections":
				return this.connections.length;
				break;

			case "reloadConf":
				await this.reloadConf();
				break;

			case "suspend":
				await this.suspend();
				break;

			case "kill":
				console.info("killed: "+this.id);
				this.exit();
				break;

			default:
				throw new Error("Unknown notification: "+notification);
				break;
		}
	}

	async disconnect(ws) {
		if (!this.connections.length)
			await this.suspend();
	}

	isUserConnected(user) {
		if (!user)
			return false;

		for (let c of this.connections)
			if (c.user==user)
				return true;

		return false;
	}
}
