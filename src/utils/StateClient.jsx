import { h, Component } from 'preact';
import { createContext } from 'preact';

let StateClientContext=createContext();

class StateClientProvider extends Component {
	constructor(props) {
		super();

		props.client.onStateChangeInternal=()=>{
			this.setState(props.client.getState());
		}

		this.state=props.client.getState();
	}

	render() {
		return (
			<StateClientContext.Provider value={this.state}>
				{this.props.children}
			</StateClientContext.Provider>
		);
	}
}

export default class StateClient {
	static Context=StateClientContext;
	static Provider=StateClientProvider;

	constructor(options) {
		this.options=options;
		this.connect();
	}

	connect() {
		this.socket=new WebSocket(this.options.url);
		this.socket.onopen=this.onSocketOpen;
		this.socket.onmessage=this.onSocketMessage;
		this.socket.onerror=this.onSocketClose;
		this.socket.onclose=this.onSocketClose;
		this.haveFirstState=false;
		this.state={};
	}

	onSocketClose=()=>{
		if (this.socket) {
			this.socket.onopen=null;
			this.socket.onmessage=null;
			this.socket.onerror=null;
			this.socket.onclose=null;
			this.socket.close();
			this.socket=null;
		}
		this.haveFirstState=false;
		this.state={};
		this.notifyStateChange();
	}

	onSocketMessage=(message)=>{
		let payload=JSON.parse(message.data);
		this.state=payload;
		//console.log("message: "+JSON.stringify(payload));

		this.haveFirstState=true;
		this.notifyStateChange();
	}

	onSocketOpen=()=>{
		console.log("socket open");
		this.notifyStateChange();
	}

	send=(message, params)=>{
		if (!params)
			params={};

		params._=message;
		console.log("sending: "+JSON.stringify(params));
		this.socket.send(JSON.stringify(params));
	}

	notifyStateChange() {
		if (this.onStateChangeInternal)
			this.onStateChangeInternal();
	}

	getState() {
		if (!this.haveFirstState) {
			return {
				send: this.send,
				connected: false
			}
		}

		let state={
			send: this.send,
			connected: true,
			...this.state
		};

		//console.log(state);

		return state;
	}
}