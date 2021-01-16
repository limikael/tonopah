import TonopahView from "./TonopahView";
import StateClient from "../utils/StateClient";
import ContentScaler from "../utils/ContentScaler";
import { useContext } from 'preact/compat';

export default (props)=>{
	let stateClient=new StateClient({
		url: props.url
	});

	function LoadingScreen() {
		let ctx=useContext(StateClient.Context);

		if (ctx.connected)
			return <TonopahView/>

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