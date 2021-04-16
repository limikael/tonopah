import SeatPlateImage from "../assets/seatPlate.png";
import DealerButtonImage from "../assets/dealerButton.png";
import CardView from "./CardView";
import ChipsView from "./ChipsView";
import TimerView from "./TimerView";
import CountChipsView from "./CountChipsView";
import {If, useIsValueChanged} from "../../utils/ReactUtil";
import ArrayUtil from "../../utils/ArrayUtil";
import ContentScaler from "../../utils/ContentScaler";
import "./SeatView.css";
import {useRef, useEffect, useContext} from "react";
import {useSpring, animated, config} from "react-spring";
import Vec from "../../utils/Vec.js";

export default (props)=>{
	const orientation=useContext(ContentScaler.OrientationContext);
	const newTournamentTable=useIsValueChanged(props.state.tournamentTableIndex);
	const containerRef=useRef();

	let potPosition=[480, 315];
	let betAlign="LCRRRRCLLL";

	let seatPositions=[
		[287,118], [483,112], [676,118], [844,247], [817,413],
		[676,490], [483,495], [287,490], [140,413], [123,247]
	];

	let chipsPositions=[
		[225, 150], [478, 150], [730, 150], [778, 196], [748, 322],
		[719, 360], [481, 360], [232, 360], [199, 322], [181, 200]
	];

	let dealerButtonPositions=[
		[347, 133], [395, 133], [574, 133], [762, 267], [715, 358],
		[574, 434], [536, 432], [351, 432], [193, 362], [168, 266]
	];

	if (orientation=="portrait") {
		potPosition=[360, 430];
		betAlign="LRRRRRLLLL";

		seatPositions=[
			[265,120], [460,120], [625,290], [625,460], [625,620],
			[460,760], [265,760], [90,620], [90,460], [90,290]
		];

		chipsPositions=[
			[240, 160], [480, 160], [560, 240], [560, 410], [560, 570],
			[490, 630], [230, 630], [150, 570], [150, 410], [150, 240]
		];

		dealerButtonPositions=[
			[330, 130], [355, 130], [525, 305], [525, 475], [505, 605],
			[355, 715], [325, 710], [168, 605], [150, 475], [150, 305]
		];
	}

	let seatData=props.state.seats[props.seatIndex];
	if (!seatData)
		seatData={};

	let containerStyle={
		"left": seatPositions[props.seatIndex][0]+"px",
		"top": seatPositions[props.seatIndex][1]+"px",
	};

	let dealerPosRel=new Vec(dealerButtonPositions[props.seatIndex])
		.sub(new Vec(seatPositions[props.seatIndex]))

	let dealerButtonStyle={
		"left": dealerPosRel.x+"px",
		"top": dealerPosRel.y+"px",
	};

	let chipsPosRel=new Vec(chipsPositions[props.seatIndex])
		.sub(new Vec(seatPositions[props.seatIndex]))

	let chipsStyle={
		"left": chipsPosRel.x+"px",
		"top": chipsPosRel.y+"px",
	};

	let chipsTranslate=new Vec(potPosition)
		.sub(chipsPosRel)
		.sub(new Vec(seatPositions[props.seatIndex]));

	let potContribStyle={
		"left": chipsPosRel.x+"px",
		"top": chipsPosRel.y+"px",
		transform: `translate(${chipsTranslate.x}px,${chipsTranslate.y}px)`,
	};

	let cards=seatData.cards;
	if (!cards)
		cards=[];

	let seatPlateStyle={
		filter: "brightness(100%) blur(0px)"
	};

	if (props.state.highlightCards &&
			props.state.speakerIndex!=props.seatIndex)
		seatPlateStyle.filter="brightness(66%) blur(2px)";

	seatPlateStyle=useSpring(seatPlateStyle);

	let [actionSpring,setActionSpring]=useSpring(()=>({
		t: 1,
		config: {
			duration: 2000
		}
	}));

	let newAction=useIsValueChanged(seatData.actionCount);
	if (!seatData.action) {
		setActionSpring({t: 1, immediate: true});
	}

	if (seatData.action && newAction && containerRef.current &&
			!newTournamentTable) {
		setActionSpring({t: 0, immediate: true});
		setActionSpring({t: 1, immediate: false});
	}

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
								folded={folded}
								state={props.state}/>
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
				<img class="seat-dealer-button"
						src={DealerButtonImage}
						style={dealerButtonStyle}/>
			)}
			<ChipsView style={chipsStyle}
					align={betAlign[props.seatIndex]}
					value={seatData.bet}/>
			<CountChipsView style={potContribStyle}
					align={betAlign[props.seatIndex]}
					value={seatData.potContrib}
					state={props.state}/>
			<CountChipsView style={potContribStyle}
					align={betAlign[props.seatIndex]}
					value={seatData.win}
					backward={true}
					state={props.state}/>
		</div>
	);
}
