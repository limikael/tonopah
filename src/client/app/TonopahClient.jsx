import TonopahView from "../view/TonopahView";
import TournamentInfoView from "../view/TournamentInfoView";
import ContentScaler from "../../utils/ContentScaler";
import mockStates from "./mockstates.js";
import {getMockReply} from "./mockreplies.mjs";
import ReactUtils from "../../utils/ReactUtil";
import {useSetTimeout} from "../../utils/ReactUtil";
import {useState} from "react";
import useRemoteState from "../../utils/useRemoteState";
import LoaderView from "../view/LoaderView";
import {Howl, Howler} from 'howler';

export default function TonopahClient(props) {
	let [stateIndex,setStateIndex]=useState(0);
	let state=useRemoteState(props.serverUrl);
	let selectContent;

	let settings={
		sounds: {},
		menu: []
	};

	if (props.menu)
		settings.menu=JSON.parse(props.menu);

	let sounds={
		attention: "attention.mp3",
		card: "card.mp3",
		chips: "chips.mp3",
		chipSingle: "chip-single.mp3",
		knock: "knock.mp3",
		reveal: "reveal.mp3"
	};

	for (let sound in sounds)
		settings.sounds[sound]=new Howl({
			src: props.resourceUrl+"/sounds/"+sounds[sound],
			autoplay: false
		});

	if (props.mock) {
		let [local,setLocal]=useState();
		let selectOptions=[];
		for (let mockState in mockStates)
			selectOptions.push({key: mockState});

		state=mockStates[selectOptions[stateIndex].key];
		state.connected=true;
		state.stateTime=performance.now();
		state.setLocal=(newLocal)=>{
			setLocal(newLocal);
		}

		state.local=local;
		state.send=(message)=>{
			console.log("sending: "+JSON.stringify(message))
		}

		let selectStyle={
			position: "absolute",
			top: "10px",
			right: "10px"
		};

		function onSelectIndexChange(index) {
			setStateIndex(index);
		}

		selectContent=(
			<ReactUtils.Select
				onIndexChange={onSelectIndexChange}
				style={selectStyle}
				labelField="key"
				options={selectOptions}
				selectedIndex={stateIndex}/>
		);
	}

	let loadingStyle={
		width: "960px",
		height: "720px",
		background: "#ccc"
	};

	let content=(
		<div class="tonopah-loader">
			<LoaderView/>
		</div>
	);

	if (state.connected) {
		if (props.mockReplies) {
			let reply=getMockReply(state);
			if (reply) {
				useSetTimeout(()=>{
					state.send(reply)
				},1000+Math.random()*2000);
			}
		}

		if (state.tournamentState=="registration" ||
				state.tournamentState=="finished") {
			content=(
				<TournamentInfoView state={state}/>
			);
		}

		else {
			content=(
				<TonopahView state={state} settings={settings}/>
			);
		}
	}

	return (
		<Fragment>
			<ContentScaler width={960} height={720}
					portraitWidth={720} portraitHeight={960}>
				{content}
			</ContentScaler>
			{selectContent}
		</Fragment>
	);
}
