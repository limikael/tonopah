import TanopahView from "./view/TanopahView";
import StateClient from "./utils/StateClient";

export default function App() {
	let stateClient1=new StateClient({
		url: "ws://localhost:9999/?channel=table-1&token=user1"
	});

	let stateClient2=new StateClient({
		url: "ws://localhost:9999/?channel=table-1&token=user2"
	});

	let stateClient3=new StateClient({
		url: "ws://localhost:9999/?channel=table-1&token=user3"
	});

	let stateClient4=new StateClient({
		url: "ws://localhost:9999/?channel=table-1&token=user4"
	});

	let style={
		"width": "50%",
		"height": "50%",
		"position": "relative",
		"display": "inline-block"
	};

	return (
		<div style={{width: "100%", height: "100%", "overflow": "hidden"}}>
			<div style={style}>
				<StateClient.Provider client={stateClient1}>
					<TanopahView />
				</StateClient.Provider>
			</div>
			<div style={style}>
				<StateClient.Provider client={stateClient2}>
					<TanopahView />
				</StateClient.Provider>
			</div>
			<div style={style}>
				<StateClient.Provider client={stateClient3}>
					<TanopahView />
				</StateClient.Provider>
			</div>
			<div style={style}>
				<StateClient.Provider client={stateClient4}>
					<TanopahView />
				</StateClient.Provider>
			</div>
		</div>	
	);
}
