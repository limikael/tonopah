import "./TournamentInfoView.css";
import {usePerformanceNow} from "../../utils/ReactUtil.jsx";
import NumberUtil from "../../utils/NumberUtil.js";

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
		</div>
	);
}