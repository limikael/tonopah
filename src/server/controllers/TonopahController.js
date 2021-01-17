const TableController=require("./TableController");

class TonopahController {
	constructor(server) {
		this.server=server;

		this.mixInClass(TableController);
	}

	mixInClass(cls) {
		for (let method of Object.getOwnPropertyNames(cls.prototype)) {
			if (method!="constructor")
				this[method]=cls.prototype[method];
		}
	}

	loadState=async (id)=>{
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
		return "micke";
	}

	present=(state, user)=> {
		return state;
	}

	message=(state, user, message, params)=> {
		this.sitInUser(state,params.seatIndex,user);
		console.log("got message: "+message);
	}
}

module.exports=TonopahController;