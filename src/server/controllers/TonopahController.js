const TableController=require("./TableController");
const ClassUtil=require("../../utils/ClassUtil");

class TonopahController {
	constructor(server) {
		this.server=server;

		ClassUtil.mixInClass(this,TableController);
	}

	load=async (id)=>{
		console.log("loading state: "+id);

		let seats=[];
		for (let i=0; i<10; i++)
			seats.push({
				user: ""
			});

		return {
			seats: seats
		};
	}

	authenticate=async (token)=>{
		switch (token) {
			case "user1":
				return "Olle";

			case "user2":
				return "Kalle";

			case "user3":
				return "Pelle";

			case "user4":
				return "Lisa";
		}
	}

	present=(state, user)=> {
		return state;
	}

	message=(state, user, message, params)=> {
		switch (message) {
			case "seatJoin":
				this.sitInUser(state,params.seatIndex,user);
				break;
		}
	}
}

module.exports=TonopahController;