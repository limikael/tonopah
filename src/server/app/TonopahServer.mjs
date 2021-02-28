import http from "http";
import ChannelServer from "../../utils/ChannelServer.js";
import TimeoutManager from "../../utils/TimeoutManager.js";
import PromiseUtil from "../../utils/PromiseUtil.js";
import Backend from "./Backend.js";
import MockBackend from "./MockBackend.js";

import * as PokerState from "../../../src/server/poker/PokerState.mjs";
import * as PokerUtil from "../../../src/server/poker/PokerUtil.mjs";

export default class TonopahServer {
	constructor(options) {
		this.options=options;
		this.tableStateById={};
	}

	getSettingsError() {
		if (!this.options.port)
			return "Need port!!!";

		if (!this.options.backend && !this.options.mock)
			return "Need backend url or mock!!!";
	}

	presentChannel(channelId) {
		let state=this.tableStateById[channelId];
		let connections=this.channelServer.getConnectionsByChannel(channelId);
		let timeLeft=this.timeoutManager.getTimeLeft(channelId);

		for (let connection of connections) {
			let p=PokerState.present(state,connection.user,timeLeft);
			connection.send(p);
		}
	}

	clearChannel(channelId) {
		this.channelServer.removeChannel(channelId);
		this.timeoutManager.clearTimeout(channelId);
		delete this.tableStateById[channelId];
	}

	onChannelCreated=async (channelId)=>{
		console.log("channel created: "+channelId);
		let data=await this.backend.fetch({
			call: "getCashGame",
			tableId: channelId
		});

		if (data.runState=="running") {
			console.error("Table is already running: "+channelId);
			throw new Error("Already running");
		}

		let tableState;
		try {
			tableState=JSON.parse(data.tableState);
		}

		catch (e) {
			console.log("Table state not defined on load");
			tableState=PokerState.createPokerState(data);
		}

		if (tableState.state=="idle") {
			tableState=PokerState.applyConfiguration(tableState,data);
			tableState=PokerState.checkStart(tableState);
		}

		this.tableStateById[channelId]=tableState;
		this.timeoutManager.setTimeout(channelId,PokerUtil.getTimeout(tableState));
	}

	onChannelDeleted=async (channelId)=>{
		let state=this.tableStateById[channelId];
		delete this.tableStateById[channelId];

		this.timeoutManager.clearTimeout(channelId);

		await this.backend.fetch({
			call: "saveCashGameTableState",
			tableId: channelId,
			tableState: JSON.stringify(state),
			runState: "suspended"
		});

		console.log("channel deleted: "+channelId);
	}

	onChannelConnect=async (connection)=>{
		let data=await this.backend.fetch({
			call: "getUserInfoByToken",
			token: connection.parameters.token
		});

		connection.user=data.user;
		console.log("New connection by user: "+connection.user);

		this.presentChannel(connection.channelId);
	}

	async removeDisconnectedUsers(channelId) {
		let tableState=this.tableStateById[channelId];
		let users=PokerUtil.getSeatedUsers(tableState);
	}

	onChannelDisconnect=async (connection)=>{
		console.log("Disconnect: "+connection.user);
		try {
			let tableState=this.tableStateById[connection.channelId];
			if (tableState.state=="idle") {
				await this.removeDisconnectedUsers(connection.channelId);
				this.presentChannel(connection.channelId);
			}

			/*if (this.isUserConnected(connection.channelId,connection.user))
				return;

			let seatIndex=PokerUtil.getSeatIndexByUser(tableState,connection.user);
			if (seatIndex<0)
				return;

			if (tableState.seats[seatIndex].state=="available" ||
					tableState.state=="idle") {
				await this.backend.fetch({
					call: "leaveCashGame",
					tableId: tableState.id,
					user: tableState.seats[seatIndex].user,
					amount: tableState.seats[seatIndex].chips
				});

				tableState=PokerState.removeUser(tableState,connection.user);
			}

			this.presentChannel(connection.channelId);*/
		}

		catch (e) {
			console.error(e);
			this.clearChannel(connection.channelId);
		}
	}

	async channelAction(channelId, action, value) {
		this.timeoutManager.clearTimeout(channelId);

		let tableState=this.tableStateById[channelId];
		tableState=PokerState.action(tableState,action,value);
		this.tableStateById[channelId]=tableState;

		this.timeoutManager.setTimeout(channelId,PokerUtil.getTimeout(tableState));

		this.presentChannel(channelId);
	}

	onChannelMessage=async (connection, message)=>{
		try {
			let tableState=this.tableStateById[connection.channelId];

			if (PokerUtil.isUserSpeaker(tableState,connection.user))
				await this.channelAction(connection.channelId,message.action,message.value);

			else if (connection.user) {
				console.log("Non-speaker action: "+JSON.stringify(message));

				if (message.action=="seatJoin")
					tableState=PokerState.reserveSeat(
						tableState,
						message.seatIndex,
						connection.user
					);

				if (message.action=="dialogCancel")
					tableState=PokerState.removeUser(
						tableState,
						connection.user
					);

				if (message.action=="dialogOk") {
					try {
						await this.backend.fetch({
							call: "joinCashGame",
							user: connection.user,
							amount: message.value,
							tableId: connection.channelId
						});

						tableState=PokerState.confirmReservation(
							tableState,
							connection.user,
							message.value
						);

						if (tableState.state=="idle") {
							tableState=PokerState.checkStart(tableState);
							this.timeoutManager.setTimeout(
								connection.channelId,
								PokerUtil.getTimeout(tableState)
							);
						}
					}

					catch (e) {
						tableState=PokerState.setUserDialogText(
							tableState,
							connection.user,
							String(e)
						);
					}
				}

				this.tableStateById[connection.channelId]=tableState;
				this.presentChannel(connection.channelId);
			}
		}

		catch (e) {
			console.error(e);
			this.clearChannel(connection.channelId);
		}
	}

	onTimeout=async (channelId)=>{
		let unlock=await this.channelServer.aquireChannelMutex(channelId);

		try {
			await this.channelAction(channelId);
		}

		catch (e) {
			console.error("Error during timeout: "+String(e));
			//console.log(e);
			this.clearChannel(channelId);
		}

		unlock();
	}

	isUserConnected(channelId, user) {
		for (let connection of this.channelServer.getConnectionsByChannel(channelId))
			if (connection.user==user)
				return true;

		return false;
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

		this.timeoutManager=new TimeoutManager();
		this.timeoutManager.on("timeout",this.onTimeout);

		this.httpServer=http.createServer();
		this.channelServer=new ChannelServer({
			server: this.httpServer
		});

		this.channelServer.on("channelCreated",this.onChannelCreated);
		this.channelServer.on("channelDeleted",this.onChannelDeleted);
		this.channelServer.on("connect",this.onChannelConnect);
		this.channelServer.on("disconnect",this.onChannelDisconnect);
		this.channelServer.on("message",this.onChannelMessage);

		this.httpServer.listen(this.options.port);

		process.on('SIGTERM',this.onStop);
		process.on('SIGINT',this.onStop);

		console.log("Listening to "+this.options.port);
	}
}
