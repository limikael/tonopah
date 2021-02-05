import TimerBackgroundImage from "../assets/timerBackground.png";
import {usePerformanceNow} from "../../utils/ReactUtil.jsx";
import TimerWhiteHalfImage from "../assets/timerWhiteHalf.png";
import TimerRedHalfImage from "../assets/timerRedHalf.png";
import "./TimerView.css";

function linMap(sourceOne, sourceTwo, targetOne, targetTwo, v) {
	let weigth=(v-sourceOne)/(sourceTwo-sourceOne);
	return (targetOne+weigth*(targetTwo-targetOne));
}

export default (props)=>{
	let now=usePerformanceNow();
	let finishTime=props.stateTime+props.timeLeft;
	let startTime=finishTime-props.totalTime;
	let frac=1-(now-startTime)/(finishTime-startTime);

	//console.log("timer view, tl="+props.timeLeft+" tt="+props.totalTime+" st="+props.stateTime);

	let bg1Style={
		transform: "translateX(.25px)"
	};

	let bg2Style={
		transform: "rotate(180deg) translateX(.25px)"
	};

	let content;
	if (frac<=0)
		content=null;

	else if (frac<.5) {
		let angle=linMap(.5,0,-180,0,frac);
		let coverStyle={
			transform: `rotate(${angle}deg) translateX(.25px)`
		};

		content=(<Fragment>
			<img src={TimerRedHalfImage} class="timer-half-image" style={bg1Style}/>
			<img src={TimerWhiteHalfImage} class="timer-half-image" style={coverStyle}/>
		</Fragment>);
	}

	else {
		let angle=linMap(1,.5,-180,0,frac);
		let otherHalfStyle={
			transform: `rotate(${angle}deg) translateX(.25px)`
		};

		content=(<Fragment>
			<img src={TimerRedHalfImage} class="timer-half-image" style={bg1Style}/>
			<img src={TimerRedHalfImage} class="timer-half-image" style={otherHalfStyle}/>
		</Fragment>);
	}

	return (
		<div style={props.style} class={"timer-container "+props.class}>
			<img src={TimerBackgroundImage} class="timer-image" />
			<img src={TimerWhiteHalfImage} class="timer-half-image" style={bg1Style}/>
			<img src={TimerWhiteHalfImage} class="timer-half-image" style={bg2Style}/>
			{content}
		</div>
	);
}