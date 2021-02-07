import TonopahClient from "./client/app/TonopahClient";
import mockstates from "./client/app/mockstates";
import ReactUtils from "./utils/ReactUtil";
import CountChipsViewTest from "./client/test/CountChipsViewTest";
import TimerViewTest from "./client/test/TimerViewTest";
import { useState } from "react";

function SingleTable(props) {
	return (
		<TonopahClient url="ws://localhost:9999/?channel=table-1&token=user1" />
	);
}

function QuadraTable(props) {
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

function TableMockStates() {
	let [stateIndex,setStateIndex]=useState(0);

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
	mockstate.stateTime=performance.now();
	mockstate.send=function(message) {
		console.log("send: "+JSON.stringify(message));
	}

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
	);
}

function DebugMenu() {
	return (
		<div>
			<h1>System Testing</h1>
			<ul>
				<li><a href="?view=quadratable">Four Tables</a></li>
				<li><a href="?view=singletable">One Table</a></li>
				<li><a href="?view=mockstates">Mocked States</a></li>
			</ul>
			<h1>Visual Unit Testing</h1>
			<ul>
				<li><a href="?view=countchips">Count Chips</a></li>
				<li><a href="?view=timer">Timer</a></li>
			</ul>
		</div>
	);
}

export default function App() {
	let params=Object.fromEntries((new URL(window.location)).searchParams);

	switch (params.view) {
		case "quadratable":
			return (<QuadraTable />);

		case "mockstates":
			return (<TableMockStates/>);

		case "singletable":
			return (<SingleTable/>);

		case "countchips":
			return (<CountChipsViewTest/>);

		case "timer":
			return (<TimerViewTest/>);

		default:
			return (<DebugMenu />);
	}
}
