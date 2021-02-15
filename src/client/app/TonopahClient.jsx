import {h, render} from 'preact';
import TonopahView from "../view/TonopahView";
import ContentScaler from "../../utils/ContentScaler";
import mockStates from "./mockstates.js";

export default function TonopahClient(props) {
	let state, send, status;
	if (props.mock) {
		state=mockStates["3 cards + pot"];
		status={connected: true};
	}

	//let {state, send, status}=useRemoteState(props.url);

	let loadingStyle={
		width: "960px",
		height: "720px",
		background: "#080"
	};

	let content=(
		<div style={loadingStyle}>
			Loading...
		</div>
	);

	if (status.connected)
		content=(
			<TonopahView
					state={state}
					assetUrl={props.assetUrl} />
		);

	return (
		<ContentScaler width={960} height={720}>
			{content}
		</ContentScaler>
	);
}
