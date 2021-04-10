import ArrayUtil from "../../utils/ArrayUtil.js";

export default class MoneyGame {
	constructor(conf, backend, mainLoop) {
		console.info(conf.type+"("+conf.id+"): creating state...");

		this.conf=conf;
		this.backend=backend;
		this.mainLoop=mainLoop;
		this.connections=[];
		this.id=conf.id;
		this.userBalances=this.conf.userBalances;
		this.gameState=this.conf.gameState;
	}

	async finalize() {
		throw new Error("abstract");
	}

	async handleMessage(user, message) {
		throw new Error("abstract");
	}

	async addConnection(ws) {
		this.connections.push(ws);
	}

	async removeConnection(ws) {
		ArrayUtil.remove(this.connections,ws);
	}

	async addUser(user, amount) {
		await this.backend.fetch({
			call: "addGameUser",
			id: this.id,
			user: user,
			amount: amount
		});

		if (!this.userBalances)
			this.userBalances={};

		this.userBalances[user]=amount;
	}

	async removeUser(user) {
		await this.backend.fetch({
			call: "removeGameUser",
			id: this.id,
			user: user
		});

		delete this.userBalances[user];
	}

	async removeAllUsers() {
		await this.backend.fetch({
			call: "removeAllGameUsers",
			id: this.id
		});

		this.userBalances={};
	}

	async updateUserBalances(balances) {
		//console.log(JSON.stringify(balances));
		this.userBalances=balances;

		this.conf=await this.backend.fetch({
			call: "syncGame",
			id: this.id,
			userBalancesJson: JSON.stringify(this.userBalances)
		});
	}

	async saveGameState() {
		await this.backend.fetch({
			call: "syncGame",
			id: this.id,
			//userBalancesJson: JSON.stringify(this.userBalances),
			gameStateJson: JSON.stringify(this.gameState)
		});
	}

	async suspend() {
		await this.finalize();
		await this.saveGameState();
	}

	/*async kill() {
	}*/

	isUserConnected(user) {
		if (!user)
			return false;

		for (let c of this.connections)
			if (c.user==user)
				return true;

		return false;
	}

	haveConnections() {
		return (this.connections.length>0);
	}
}
