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

	connect=()=>{
		if (this.reconnectTimeout) {
			clearTimeout(this.reconnectTimeout);
			this.reconnectTimeout=null;
		}

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

		this.reconnectTimeout=setTimeout(this.connect,5000);
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

	send=(message)=>{
		if (!message)
			message={};

		console.log("sending: "+JSON.stringify(message));
		this.socket.send(JSON.stringify(message));
	}

	notifyStateChange() {
		if (this.onStateChangeInternal)
			this.onStateChangeInternal();
	}

	getState() {
		if (!this.haveFirstState) {
			return {
				send: this.send,
				connected: false,
				stateTime: null
			}
		}

		let state={
			send: this.send,
			connected: true,
			stateTime: performance.now(),
			...this.state
		};

		//console.log(state);

		return state;
	}
}