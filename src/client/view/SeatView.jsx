import SeatPlateImage from "../assets/seatPlate.png";
import DealerButtonImage from "../assets/dealerButton.png";
import CardView from "./CardView";
import ChipsView from "./ChipsView";
import TimerView from "./TimerView";
import CountChipsView from "./CountChipsView";
import {If, useIsValueChanged} from "../../utils/ReactUtil";
import ArrayUtil from "../../utils/ArrayUtil";
import "./SeatView.css";
import {useRef, useEffect} from "react";
import {useSpring, animated, config} from "react-spring";

export default (props)=>{
	const containerRef=useRef();
	const potPosition=[485, 315];

	const seatPositions=[
		[287,118], [483,112], [676,118], [844,247], [817,413],
		[676,490], [483,495], [287,490], [140,413], [123,247]
	];

	const dealerButtonPositions=[
		[60,15], [-88,21], [-102,15], [-82,20], [-102,-55],
		[-102,-56], [53,-63], [64,-58], [53,-51], [45,19]
	];

	const chipsPositions=[
		[-62,32],[-5,38],[54,32],[-66,-51],[-69,-91],
		[43,-130],[-2,-135],[-55,-130],[59,-91],[58,-47]
	];

	const betAlign="LCRRRRCLLL";

	let seatData=props.state.seats[props.seatIndex];
	if (!seatData)
		seatData={};

	let resetAction=useIsValueChanged(seatData.actionCount);

	let containerStyle={
		"left": seatPositions[props.seatIndex][0]+"px",
		"top": seatPositions[props.seatIndex][1]+"px",
	};

	let dealerButtonStyle={
		"left": dealerButtonPositions[props.seatIndex][0]+"px",
		"top": dealerButtonPositions[props.seatIndex][1]+"px",
	};

	let chipsStyle={
		"left": chipsPositions[props.seatIndex][0]+"px",
		"top": chipsPositions[props.seatIndex][1]+"px",
	};

	let cards=seatData.cards;
	if (!cards)
		cards=[];

	let x=potPosition[0]-
		chipsPositions[props.seatIndex][0]-
		seatPositions[props.seatIndex][0];

	let y=potPosition[1]-
		chipsPositions[props.seatIndex][1]-
		seatPositions[props.seatIndex][1];

	let potContribStyle={
		"left": chipsPositions[props.seatIndex][0]+"px",
		"top": chipsPositions[props.seatIndex][1]+"px",
		transform: `translate(${x}px,${y}px)`,
	};

	let seatPlateStyle={
		filter: "brightness(100%) blur(0px)"
	};

	if (props.state.highlightCards &&
			props.state.speakerIndex!=props.seatIndex)
		seatPlateStyle.filter="brightness(66%) blur(2px)";

	seatPlateStyle=useSpring(seatPlateStyle);

	let actionSpring={
		t: 1,
		immediate: true
	};

	if (seatData.action && seatData.actionCount>0) {
		actionSpring.reset=resetAction;
		actionSpring.immediate=!containerRef.current;
		actionSpring.config={
			duration: 2000
		}
		actionSpring.from={
			t: 0,
		};
	}

	actionSpring=useSpring(actionSpring);

	let actionStyle={
		opacity: actionSpring.t.interpolate({
			range: [0, 0.5, 1],
			output: [1, 1, 0]
		})
	}

	let textStyle={
		opacity: actionSpring.t.interpolate({
			range: [0, 0.5, 1],
			output: [0, 0, 1]
		})
	}

	if (seatData.state=="inactive")
		return null;

	return (
		<div class="seat-container" style={containerStyle} ref={containerRef}>
			<div class="seat-card-container">
				{ArrayUtil.range(2).map(index=>{
					let darken=false;
					let highlight=false;

					if (props.state.highlightCards) {
						let hl=props.state.highlightCards;

						if (props.state.speakerIndex==props.seatIndex &&
								hl.seatCards.indexOf(index)>=0)
							highlight=true;

						else
							darken=true;
					}

					let folded=(
						seatData.state=="gameOver" ||
						seatData.state=="muck"
					);

					return (
						<CardView class="seat-card" value={cards[index]}
								darken={darken}
								highlight={highlight}
								folded={folded}/>
					)
				})}
			</div>
			<animated.div class="seat-plate" onClick={props.onClick}
					style={seatPlateStyle}>
				<img class="seat-image" src={SeatPlateImage}/>
				<animated.div style={textStyle} class="seat-name-text">{seatData.user}</animated.div>
				<animated.div style={textStyle} class="seat-chips-text">{seatData.chips}</animated.div>
				<animated.div style={actionStyle} class="seat-action-text">
					{seatData.action}
				</animated.div>
			</animated.div>
			{If(props.seatIndex==props.state.speakerIndex &&
					props.state.totalTime,()=>
				<TimerView class="seat-timer"
						stateTime={props.state.stateTime}
						timeLeft={props.state.timeLeft}
						totalTime={props.state.totalTime}/>
			)}
			{If(props.seatIndex==props.state.dealerIndex,()=>
				<img class="seat-dealer-button" src={DealerButtonImage}
						style={dealerButtonStyle}/>
			)}
			<ChipsView style={chipsStyle}
					align={betAlign[props.seatIndex]}
					value={seatData.bet}/>
			<CountChipsView style={potContribStyle}
					align={betAlign[props.seatIndex]}
					value={seatData.potContrib}/>
			<CountChipsView style={potContribStyle}
					align={betAlign[props.seatIndex]}
					value={seatData.win}
					backward={true}/>
		</div>
	);
}
