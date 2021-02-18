import {useState, useEffect} from "react";

export default function useRemoteState(url) {
	let [remoteState,setRemoteState]=useState({
		connected: false,
		send: ()=>{console.log("Warning, can't send, not connected!")}
	});

	useEffect(()=>{
		if (!url)
			return;

		console.log("connecting to: "+url);
		let webSocket=new window.WebSocket(url);

		function send(message) {
			webSocket.send(JSON.stringify(message));
		}

		function close() {
			setRemoteState({
				connected: false,
				send: ()=>{console.log("Warning, can't send, not connected!")}
			});
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

		return ()=>{
			console.log("closing...");
			webSocket.onmessage=null;
			webSocket.close();
		}
	},[]);

	return remoteState;
}