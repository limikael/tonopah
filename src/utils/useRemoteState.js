import {useState, useEffect} from "react";

export default function useRemoteState(url) {
	let defaultState={
		connected: false,
		send: ()=>{console.log("Warning, not connected!")},
		setLocal: ()=>{console.log("Warning, not connected!")},
	};

	let [remoteState,setRemoteState]=useState(defaultState);

	useEffect(()=>{
		if (!url)
			return;

		let webSocket;
		let reconnectTimeout;

		function connect() {
			console.log("connecting to: "+url);

			webSocket=new window.WebSocket(url);
			reconnectTimeout=null;

			function send(message) {
				webSocket.send(JSON.stringify(message));
			}

			function close() {
				setRemoteState(defaultState);

				if (reconnectTimeout)
					clearTimeout(reconnectTimeout);

				reconnectTimeout=setTimeout(connect,5000);
			}

			webSocket.onclose=close;
			webSocket.onerror=close;

			webSocket.onmessage=(ev)=>{
				let state=JSON.parse(ev.data);
				state.send=send;
				state.connected=true;
				state.stateTime=performance.now();
				state.local=remoteState.local;
				state.setLocal=(local)=>{
					let newState=JSON.parse(ev.data);
					newState.send=state.send;
					newState.setLocal=state.setLocal;
					newState.connected=true;
					newState.stateTime=state.stateTime;
					newState.local=local;
					setRemoteState(newState);
				}

				//console.log(state);
				setRemoteState(state);
			}
		}

		connect();

		return ()=>{
			console.log("closing...");
			if (webSocket) {
				webSocket.onmessage=null;
				webSocket.close();
				webSocket=null;
			}

			if (reconnectTimeout) {
				clearTimeout(reconnectTimeout);
				reconnectTimeout=null;
			}
		}
	},[]);

	return remoteState;
}
