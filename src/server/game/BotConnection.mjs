import ArrayUtil from "../../utils/ArrayUtil.js";

class BotConnection {
	constructor(params) {
		this.params=params;
		this.botNum=this.params.botNum;
		this.user="#bot"+this.params.botNum;
	}

	actOnState=()=>{
		if (!this.state.seats[this.params.botNum].user) {
			console.log("sitting in bot step 1");
			this.reply({
				action: "seatJoin",
				seatIndex: this.botNum
			});
		}

		if (this.state.dialogButtons && this.state.dialogButtons.length==2 &&
				this.state.dialogButtons[1].action=="dialogOk") {
			console.log("sitting in bot step 2");
			this.reply({
				action: "dialogOk",
				value: this.state.dialogValue
			});
		}

		if (this.state.buttons && this.state.buttons.length) {
			let possibleActions=["postBlind","call","raise","muck","show"/*,"fold"*/];
			let action;

			ArrayUtil.shuffle(this.state.buttons);

			for (let i=0; i<this.state.buttons.length; i++)
				if (possibleActions.indexOf(this.state.buttons[i].action)>=0)
					action=this.state.buttons[i].action;

			//console.log("acting in bot: "+action);
			this.reply({
				action: action
			});
		}
	}

	reply(message) {
		this.onmessage({
			data: JSON.stringify(message)
		});
	}

	send(messageJson) {
		clearTimeout(this.timeout);
		this.state=JSON.parse(messageJson);

		this.timeout=setTimeout(this.actOnState,1000+Math.random()*2000);
	}

	close() {
		clearTimeout(this.timeout);

		console.log("Closing bot: "+this.user);
	}
}

export default BotConnection;
