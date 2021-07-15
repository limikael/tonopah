import CardBackImage from "../assets/cardBack.png";
import CardFrameImage from "../assets/cardFrame.png";
import SuitSymbolImage0 from "../assets/suitSymbol0.png";
import SuitSymbolImage1 from "../assets/suitSymbol1.png";
import SuitSymbolImage2 from "../assets/suitSymbol2.png";
import SuitSymbolImage3 from "../assets/suitSymbol3.png";
import {useState, useRef} from "react";
import {useSpring, animated} from "react-spring";
import CardData from "../../data/CardData";
import {useIsValueChanged} from "../../utils/ReactUtil.jsx";
import "./CardView.css";

export default (props)=>{
	let newTournamentTable=useIsValueChanged(props.state.tournamentTableIndex);
	let cardValueChange=useIsValueChanged(props.value);

	if (props.value>=0 && cardValueChange && !props.folded
			&& !newTournamentTable) {
		props.settings.sounds.card.stop();
		props.settings.sounds.card.play();
		//console.log("playing");
	}

	const symbolImages=[
		SuitSymbolImage0,
		SuitSymbolImage1,
		SuitSymbolImage2,
		SuitSymbolImage3
	];

	let staticStyle={
		overflow: "hidden",
		width: "87px"
	};

	let style={
		opacity: 1,
		transform: "translate(0px,0px)",
		filter: "brightness(100%) blur(0px)",
		height: "122px",
		immediate: false
	};

	if (props.value===undefined) {
		style.opacity=0;
		style.transform="translate(0px,-50px)";
	}

	else if (props.folded) {
		style.transform="translate(0px,75px)";
		style.height="0px";
	}

	else if (props.darken) {
		style.filter="brightness(66%) blur(2px)";
	}

	else if (props.highlight) {
		style.transform="translate(0px,-10px)";
	}

	if (newTournamentTable)
		style.immediate=true;

	style=useSpring(style);

	function CardContents() {
		if (props.value===undefined)
			return null;

		if (props.value<0)
			return (
				<img class="card-image" src={CardBackImage}/>
			);

		let cardData=new CardData(props.value);
		let cardTextStyle={
			color: cardData.getColor()
		};

		return (
			<Fragment>
				<img class="card-image" src={CardFrameImage}/>
				<img class="card-symbol-image" src={symbolImages[cardData.getSuitIndex()]}/>
				<div class="card-symbol-text" style={cardTextStyle}>
					{cardData.getCardValueString()}
				</div>
			</Fragment>
		);
	}

	return (
		<animated.div class={props.class+" play-card"}
				style={{...style,...staticStyle,...props.style}}>
			<CardContents/>
		</animated.div>
	);
}