import ReactUtil from "../../utils/ReactUtil";
import NumberUtil from "../../utils/NumberUtil.js";
import {usePerformanceNow} from "../../utils/ReactUtil.jsx";

export default (props)=>{
	let now=usePerformanceNow();
	let elapsed=now-props.state.stateTime;
	let timeLeft=props.state.statusTimeLeft-elapsed;
	let timeLeftFormatted=NumberUtil.formatMillis(timeLeft);
	let t=props.state.statusText.replace("%t",timeLeftFormatted);

	return (
		<div class="table-status">
			{ReactUtil.linesToParagraphs(t)}
		</div>
	);
}
