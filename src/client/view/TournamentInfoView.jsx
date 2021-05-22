import "./TournamentInfoView.css";
import {usePerformanceNow} from "../../utils/ReactUtil.jsx";
import NumberUtil from "../../utils/NumberUtil.js";
import DialogView from "./DialogView";
import ReactUtil from "../../utils/ReactUtil";

export default function TournamentInfoView(props) {
	let performanceNow=usePerformanceNow();
	let timeLeftFormatted="";

	if (props.state.tournamentStartsIn) {
		let startTime=props.state.stateTime+props.state.tournamentStartsIn;
		let timeLeft=startTime-performanceNow;
		timeLeftFormatted=NumberUtil.formatMillis(timeLeft);
	}

	let texts=[];
	for (let text of props.state.tournamentTexts)
		texts.push(text.replace("%t",timeLeftFormatted));

	function onButtonClick(action) {
		props.state.send({
			action: action
		});
	}

	function onDialogButtonClick(index, value) {
		props.state.send({
			action: props.state.dialogButtons[index].action,
			value: value
		});
	}

	let buttons=props.state.tournamentButtons;
	if (!buttons)
		buttons=[];

	return (
		<div class="tournament-info-screen">
			<div class="tournament-info-screen-inner">
				{texts.map(text=>
					<p>{text}</p>
				)}
				<div class="tournament-info-button-container">
					{buttons.map((buttonData,index)=>
						<button class="dialog-button"
								onClick={onButtonClick.bind(null,buttonData.action)}>
							{buttonData.label}
						</button>
					)}
				</div>
			</div>
			{ReactUtil.If(props.state.dialogText
					&& props.state.promptId!=props.state.local,()=>
				<DialogView state={props.state} 
						onButtonClick={onDialogButtonClick}/>
			)}
		</div>
	);
}