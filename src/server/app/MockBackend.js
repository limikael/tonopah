import {performance} from "perf_hooks";

export default class MockBackend {
	calls=[];

	constructor(conf) {
		this.log=true;

		if (conf && conf.hasOwnProperty("log"))
			this.log=conf.log;
	}

	async fetch(params) {
		if (this.log)
			console.log("Mock backend call: "+params.call);

		this.calls.push(params);

		switch (params.call) {
			case "getCashGame":
				return {
					stake: 2,
					minSitInAmount: 10,
					maxSitInAmount: 100,
					currency: "ply",
					status: "publish"
				};
				break;

			case "getTournament":
				return {
					status: "publish",
					startTime: Date.now()+10000
				};
				breal;

			case "saveCashGameTableState":
				return {};
				break;

			case "getUserInfoByToken":
				switch (params.token) {
					case "user1":
						return {user: "olle"};
						break;

					case "user2":
						return {user: "kalle"};
						break;

					case "user3":
						return {user: "pelle"};
						break;

					case "user4":
						return {user: "lisa"};
						break;
				}
				break;

			case "leaveCashGame":
				return {};
				break;

			case "joinCashGame":
				return {};
				break;

			default:
				throw new Error("unknown backend call: "+params.call);
				break;
		}
	}
}
