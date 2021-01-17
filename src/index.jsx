import TonopahClient from "./view/TonopahClient";

export default function App() {
	let style={
		"width": "50%",
		"height": "50%",
		"position": "relative",
		"display": "inline-block"
	};

	return (
		<div style={{width: "100%", height: "100%", "overflow": "hidden"}}>
			<div style={style}>
				<TonopahClient url="ws://localhost:9999/?channel=table-1&token=user1" />
			</div>
			<div style={style}>
				<TonopahClient url="ws://localhost:9999/?channel=table-1&token=user1" />
			</div>
			<div style={style}>
				<TonopahClient url="ws://localhost:9999/?channel=table-1&token=user1" />
			</div>
			<div style={style}>
				<TonopahClient url="ws://localhost:9999/?channel=table-1&token=user1" />
			</div>
		</div>	
	);
}