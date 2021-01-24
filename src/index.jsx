import TonopahClient from "./client/app/TonopahClient";
import mockstates from "./client/app/mockstates";
import ReactUtils from "./utils/ReactUtil";
import { useState } from "react";

export default function App() {
	/*let [stateIndex,setStateIndex]=useState(0);

	let style={
		"width": "100%",
		"height": "100%",
		"position": "relative"
	};

	let selectStyle={
		position: "absolute",
		top: "10px",
		left: "10px"
	};

	let selectOptions=[];
	for (let mockstate in mockstates)
		selectOptions.push({key: mockstate});

	let mockstate=mockstates[selectOptions[stateIndex].key];

	function onSelectIndexChange(newIndex) {
		setStateIndex(newIndex);
	}

	return (
		<div style={style}>
			<TonopahClient state={mockstate} />
			<ReactUtils.Select
					onIndexChange={onSelectIndexChange}
					style={selectStyle}
					labelField="key"
					options={selectOptions}/>
		</div>
	);*/

	/*return (
		<TonopahClient url="ws://localhost:9999/?channel=table-1&token=user1" />
	);*/

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
				<TonopahClient url="ws://localhost:9999/?channel=table-1&token=user2" />
			</div>
			<div style={style}>
				<TonopahClient url="ws://localhost:9999/?channel=table-1&token=user3" />
			</div>
			<div style={style}>
				<TonopahClient url="ws://localhost:9999/?channel=table-1&token=user4" />
			</div>
		</div>	
	);
}
