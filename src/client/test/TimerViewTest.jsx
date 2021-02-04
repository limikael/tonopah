import ContentScaler from "../../utils/ContentScaler";
import ReactUtil from "../../utils/ReactUtil";
import { useState } from "react";
import TimerView from "../view/TimerView";

export default (props)=>{
	let [timeValues,setTimeValues]=useState();
	let [dummyValue,setDummyValue]=useState(0);

	let style={
		width: "100%",
		height: "100%",
		position: "relative"
	};

	let buttonsStyle={
		position: "absolute",
		top: 0
	};

	let timerStyle={
		left: "50px",
		top: "50px"
	}

	function buttonClick(totalTime,timeLeft,p) {
		//setDummyValue(dummyValue+1);
		if (!totalTime)
			setTimeValues(null);

		else
			setTimeValues({
				totalTime: totalTime,
				timeLeft: timeLeft,
				stateTime: performance.now(),
				percentage: p
			});
	}

	return (
		<div style={style}>
			<ContentScaler width={960} height={720}>
				{ReactUtil.If(timeValues,()=>
					<TimerView
						style={timerStyle}
						totalTime={timeValues.totalTime}
						timeLeft={timeValues.timeLeft}
						stateTime={timeValues.stateTime}/>
				)}
			</ContentScaler>
			<div style={buttonsStyle}>
				<button onClick={buttonClick.bind(null,undefined)}>clear</button>
				<button onClick={buttonClick.bind(null,30000,15000)}>15/30</button>
				<button onClick={buttonClick.bind(null,30000,30000)}>30/30</button>
				<button onClick={buttonClick.bind(null,10000,8000)}>8/10</button>
			</div>
		</div>
	);
}