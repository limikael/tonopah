class MockBackend {
	calls=[];

	async fetch(params) {
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

			case "joinCashGame":
				return {}
				break;

			default:
				throw new Error("unknown backend call: "+params.call);
				break;
		}
	}
}

module.exports=MockBackend;