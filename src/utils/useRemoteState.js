import {useState, useEffect} from "react";

export default function useRemoteState(url) {
	let [remote,setRemote]=useState({
		state: null,
		connected: false,
		send: ()=>{console.log("Warning, can't send, not connected!")}
	});

	useEffect(()=>{
		if (!url)
			return;

		console.log("connecting to: "+url);
		let webSocket=new window.WebSocket(url);

		webSocket.onmessage=(message)=>{
			
		}

		return ()=>{
			webSocket.onmessage=null;
			webSocket.close();
		}
	});

	return remote;
}