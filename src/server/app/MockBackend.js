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
//			console.log("Mock backend call: "+JSON.stringify(params));
			console.log("Mock backend call: "+params.call);

		this.calls.push(params);

		switch (params.call) {
			case "aquireGame":
				switch (params.id) {
					case "table1":
						return {
							id: "table1",
							type: "cashgame",
							stake: 2,
							minSitInAmount: 10,
							maxSitInAmount: 100,
							currency: "ply",
							status: "publish",
							divisorPlaces: 2
						};
						break;

					case "tour1":
						return {
							id: "tour1",
							type: "tournament",
							currency: "ply",
							status: "publish",
							startTime: Date.now()+10000,
							seatsPerTable: 2
						};
						break;
				}
				break;

			case "syncGame":
				return {
/*					status: "publish",
					startTime: Date.now()+10000,
					seatsPerTable: 2*/
				};
				break;

			case "addGameUser":
				//throw new Error("bla");
				return {};
				break;

			case "removeGameUser":
				return {};
				break;

			case "removeAllGameUsers":
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

					default:
						return {};
						break;
				}
				break;

			default:
				throw new Error("unknown backend call: "+params.call);
				break;
		}
	}
}
