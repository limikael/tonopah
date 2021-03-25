import {useState, useEffect} from "react";

export default function useRemoteState(url) {
	let [remoteState,setRemoteState]=useState({
		connected: false,
		send: ()=>{console.log("Warning, can't send, not connected!")}
	});

	useEffect(()=>{
//		console.log("in use effect...");

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
				setRemoteState({
					connected: false,
					send: ()=>{console.log("Warning, can't send, not connected!")}
				});

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