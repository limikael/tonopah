import TonopahView from "../view/TonopahView";
import ContentScaler from "../../utils/ContentScaler";
import mockStates from "./mockstates.js";
import ReactUtils from "../../utils/ReactUtil";
import {useState} from "react";
import useRemoteState from "../../utils/useRemoteState";

export default function TonopahClient(props) {
	let [stateIndex,setStateIndex]=useState(0);
	let state=useRemoteState(props.serverUrl);
	let selectContent;

	if (props.mock) {
		let selectOptions=[];
		for (let mockState in mockStates)
			selectOptions.push({key: mockState});

		state=mockStates[selectOptions[stateIndex].key];
		state.connected=true;
		state.send=(message)=>{
			console.log("sending: "+JSON.stringify(message))
		}

		let selectStyle={
			position: "absolute",
			top: "10px",
			left: "10px"
		};

		function onSelectIndexChange(index) {
			setStateIndex(index);
		}

		selectContent=(
			<ReactUtils.Select
				onIndexChange={onSelectIndexChange}
				style={selectStyle}
				labelField="key"
				options={selectOptions}/>
		);
	}

	let loadingStyle={
		width: "960px",
		height: "720px",
		background: "#ccc"
	};

	let content=(
		<div style={loadingStyle}>
			Loading...
		</div>
	);

	if (state.connected)
		content=(
			<TonopahView state={state}/>
		);

	return (
		<Fragment>
			<ContentScaler width={960} height={720}>
				{content}
			</ContentScaler>
			{selectContent}
		</Fragment>
	);
}
