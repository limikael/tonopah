import TonopahView from "../view/TonopahView";
import StateClient from "../../utils/StateClient";
import ContentScaler from "../../utils/ContentScaler";
import { useContext } from 'preact/compat';

export default (props)=>{
	if (props.state) {
		return (
			<ContentScaler width={960} height={720}>
				<TonopahView state={props.state}/>
			</ContentScaler>
		);
	}

	let stateClient=new StateClient({
		url: props.url
	});

	function LoadingScreen() {
		let ctx=useContext(StateClient.Context);

		if (ctx.connected)
			return <TonopahView state={ctx}/>

		else
			return <div>Loading...</div>
	}

	return (
		<StateClient.Provider client={stateClient}>
			<ContentScaler width={960} height={720}>
				<LoadingScreen/>
			</ContentScaler>
		</StateClient.Provider>
	);
}