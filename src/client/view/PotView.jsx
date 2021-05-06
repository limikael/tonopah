import ChipsView from "./ChipsView";
import {useContext} from "react";
import ContentScaler from "../../utils/ContentScaler";

export default (props)=>{
	let orientation=useContext(ContentScaler.OrientationContext);
	let potPosition=[480, 315];

	if (orientation=="portrait")
		potPosition=[360, 430];

	let style={
		left: potPosition[0]+"px",
		top: potPosition[1]+"px"
	};

	let pots=props.state.pots;
	if (!pots)
		pots=[];

	let tot=0;
	for (let pot of pots)
		tot+=pot;

	return (
		<div class="pot-container">
			<ChipsView style={style} value={tot} state={props.state}/>
		</div>
	)
}