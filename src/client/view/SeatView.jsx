import SeatPlateImage from "../assets/seatPlate.png";
import DealerButtonImage from "../assets/dealerButton.png";
import CardView from "./CardView";
import ChipsView from "./ChipsView";
import TimerView from "./TimerView";
import CountChipsView from "./CountChipsView";
import ReactUtil from "../../utils/ReactUtil";
import ArrayUtil from "../../utils/ArrayUtil";
import "./SeatView.css";
import {useRef, useEffect} from "react";
import {useSpring, animated} from "react-spring";

export default (props)=>{
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
		return null;

	if (seatData.hasOwnProperty("active") && !seatData.active)
		return null;

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
			props.state.highlightCards.seatIndex!=props.seatIndex)
		seatPlateStyle={
			filter: "brightness(66%) blur(2px)"
		};

	seatPlateStyle=useSpring(seatPlateStyle);

	return (
		<div class="seat-container"
				style={containerStyle}>
			<div class="seat-card-container">
				{ArrayUtil.range(2).map(index=>{
					let darken=false;
					let highlight=false;

					if (props.state.highlightCards) {
						let hl=props.state.highlightCards;

						if (hl.seatIndex==props.seatIndex &&
								hl.seatCards.indexOf(index)>=0)
							highlight=true;

						else
							darken=true;
					}

					return (
						<CardView class="seat-card" value={cards[index]}
								darken={darken} highlight={highlight}/>
					)
				})}
			</div>
			<animated.div class="seat-plate" onClick={props.onClick}
					style={seatPlateStyle}>
				<img class="seat-image" src={SeatPlateImage}/>
				<div class="seat-name-text">{seatData.user}</div>
				<div class="seat-chips-text">{seatData.chips}</div>
			</animated.div>
			{ReactUtil.If(props.seatIndex==props.state.seatIndex,()=>
				<TimerView class="seat-timer"
						stateTime={props.state.stateTime}
						timeLeft={props.state.timeLeft}
						totalTime={props.state.totalTime}/>
			)}
			{ReactUtil.If(props.seatIndex==props.state.dealerIndex,()=>
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
