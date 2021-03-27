import "./TournamentInfoView.css";
import {usePerformanceNow} from "../../utils/ReactUtil.jsx";

function formatMillis(millis) {
	let secs=Math.round(millis/1000);
	if (secs<0)
		secs=0;

	let s = (secs % 60).toString();
	let m = (Math.floor(secs / 60) % 60).toString();
	let hr = (Math.floor(secs / (60 * 60))).toString();

	if (s.length < 2)
		s = "0" + s;

	if (m.length < 2)
		m = "0" + m;

	if (hr == "0")
		hr = "";

	else {
		if (hr.length < 2)
			hr = "0" + hr;

		hr += ":";
	}

	let text = hr + m + ":" + s;

	return text;
}

export default function TournamentInfoView(props) {
	let performanceNow=usePerformanceNow();
	let timeLeftFormatted="";

	if (props.state.tournamentStartsIn) {
		let startTime=props.state.stateTime+props.state.tournamentStartsIn;
		let timeLeft=startTime-performanceNow;
		timeLeftFormatted=formatMillis(timeLeft);
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