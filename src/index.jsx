import TonopahClient from "./client/app/TonopahClient";
import mockstates from "./client/app/mockstates";

export default function App() {
	return (
		<TonopahClient state={mockstates.players_and_cards} />
	);

/*	return (
		<TonopahClient url="ws://localhost:9999/?channel=table-1&token=user1" />
	);*/

	/*let style={
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
				<TonopahClient url="ws://localhost:9999/?channel=table-1&token=user2" />
			</div>
			<div style={style}>
				<TonopahClient url="ws://localhost:9999/?channel=table-1&token=user3" />
			</div>
			<div style={style}>
				<TonopahClient url="ws://localhost:9999/?channel=table-1&token=user4" />
			</div>
		</div>	
	);*/
}
