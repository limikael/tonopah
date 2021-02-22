class MockBackend {
	calls=[];

	async fetch(params) {
		console.log("Mock backend call: "+params.call);

		this.calls.push(params);

		switch (params.call) {
			case "getCashGame":
				return {
					stake: 2,
					minSitInAmount: 10,
					maxSitInAmount: 100,
					currency: "ply"
				}
				break;

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

module.exports=MockBackend;