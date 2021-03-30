import AsyncState from "../../utils/AsyncState.mjs";
import EventEmitter from "events";
import ArrayUtil from "../../utils/ArrayUtil.js";

export default class MoneyGame extends EventEmitter {
	constructor(type, id, backend) {
		super();

		console.info(type+"("+id+"): creating state...");

		this.type=type;
		this.id=id;
		this.backend=backend;
		this.userBalances={};
		this.connections=[];
		this.state=new AsyncState();
		this.state.on("finalized",this.onStateFinalized);

		this.reduce(async ()=>{
			this.conf=await this.backend.fetch({
				call: "aquireGame",
				type: this.type,
				id: this.id
			});

			this.userBalances=this.conf.userBalances;

			return this.conf.gameState;
		});
	}

	onStateFinalized=()=>{
		for (let ws of this.connections)
			ws.close();

		this.connections=[];
		this.emit("finalize");
		this.emit("done",this);
	}

	reduce(f) {
		return this.state.apply(f);
	}

	addConnection(ws) {
		if (this.state.isFinalized()) {
			ws.close();
			return;
		}

		this.connections.push(ws);

		ws.onmessage=(ev)=>{
			let message=JSON.parse(ev.data);
			this.emit("message",ws.user,message);
		}

		ws.onclose=(ev)=>{
			ArrayUtil.remove(this.connections,ws);
			this.emit("disconnect");

			if (!this.connections.length) {
				this.reduce((t)=>{
					console.log("no more connections!");
					this.suspend();

					return null;
				});
			}
		}

		this.emit("connect",ws);
	}

	async addUser(user, amount) {
		await this.backend.fetch({
			call: "addGameUser",
			id: this.id,
			user: user,
			amount: amount
		});

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

	async updateUserBalances(balances) {
		//console.log(JSON.stringify(balances));
		this.userBalances=balances;

		this.conf=await this.backend.fetch({
			call: "syncGame",
			id: this.id,
			userBalancesJson: JSON.stringify(this.userBalances)
		});
	}

	async suspend() {
		await this.reduce(async (t)=> {
			console.info(this.type+"("+this.id+"): suspending...");

			await this.backend.fetch({
				call: "syncGame",
				id: this.id,
				//userBalancesJson: JSON.stringify(this.userBalances),
				gameStateJson: JSON.stringify(t)
			});

			this.state.finalize();
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
}
