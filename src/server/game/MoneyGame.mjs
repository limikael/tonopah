import ArrayUtil from "../../utils/ArrayUtil.js";
import ResyncServer from "../utils/ResyncServer.js";
import EventEmitter from "events";
import {emitEx} from "../utils/EventEmitterUtil.js";

export default class MoneyGame extends EventEmitter {
	constructor(conf, backend, mainLoop) {
		super();

		console.info(conf.type+"("+conf.id+"): Creating.");

		this.conf=conf;
		this.backend=backend;
		this.mainLoop=mainLoop;
		this.connections=[];
		this.id=conf.id;
		this.userBalances=this.conf.userBalances;
		this.gameState=this.conf.gameState;
	}

	async finalize() {
		for (let ws of this.connections)
			ResyncServer.closeConnection(ws);

		this.connections=[];
	}

	async exit() {
		console.info(this.conf.type+"("+this.conf.id+"): Exit.");

		await this.removeAllUsers();
		await this.backend.fetch({
			call: "syncGame",
			id: this.id,
			userBalancesJson: JSON.stringify([]),
			gameStateJson: JSON.stringify(null),
			aquireCode: this.conf.aquireCode,
			release: true
		});

		await this.finalize();
		await emitEx(this,"exit",this.id);
	}

	async handleMessage(user, message) {
		throw new Error("abstract");
	}

	async addConnection(ws) {
		this.connections.push(ws);
		console.log("Connect: "+this.conf.type+"("+this.id+"): "+ws.user);
	}

	async removeConnection(ws) {
		ArrayUtil.remove(this.connections,ws);
		console.log("Disconnect: "+this.conf.type+"("+this.id+"): "+ws.user);
	}

	async addUser(user, amount) {
		await this.backend.fetch({
			call: "addGameUser",
			id: this.id,
			user: user,
			amount: amount,
			aquireCode: this.conf.aquireCode
		});

		if (!this.userBalances)
			this.userBalances={};

		this.userBalances[user]=amount;
	}

	async removeUser(user) {
		await this.backend.fetch({
			call: "removeGameUser",
			id: this.id,
			user: user,
			aquireCode: this.conf.aquireCode
		});

		delete this.userBalances[user];
	}

	async removeAllUsers() {
		await this.backend.fetch({
			call: "removeAllGameUsers",
			id: this.id,
			aquireCode: this.conf.aquireCode
		});

		this.userBalances={};
	}

	async updateUserBalances(balances) {
		//console.log(JSON.stringify(balances));
		this.userBalances=balances;

		await this.backend.fetch({
			call: "syncGame",
			id: this.id,
			userBalancesJson: JSON.stringify(this.userBalances),
			aquireCode: this.conf.aquireCode
		});
	}

	async saveGameState() {
		await this.backend.fetch({
			call: "syncGame",
			id: this.id,
			gameStateJson: JSON.stringify(this.gameState),
			aquireCode: this.conf.aquireCode
		});
	}

	async suspend() {
		console.info(this.conf.type+"("+this.conf.id+"): Suspending.");

		await this.backend.fetch({
			call: "syncGame",
			id: this.id,
			userBalancesJson: JSON.stringify(this.userBalances),
			gameStateJson: JSON.stringify(this.gameState),
			aquireCode: this.conf.aquireCode,
			release: true
		});

		await this.finalize();
	}

	async reloadConf() {
		console.info(this.conf.type+"("+this.conf.id+"): Reloading.");

		this.conf=await this.backend.fetch({
			call: "getGame",
			id: this.id,
			aquireCode: this.conf.aquireCode
		});
	}

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
