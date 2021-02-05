import CardBackImage from "../assets/cardBack.png";
import CardFrameImage from "../assets/cardFrame.png";
import SuitSymbolImage0 from "../assets/suitSymbol0.png";
import SuitSymbolImage1 from "../assets/suitSymbol1.png";
import SuitSymbolImage2 from "../assets/suitSymbol2.png";
import SuitSymbolImage3 from "../assets/suitSymbol3.png";
import {useState, useRef} from "react";
import {useSpring, animated} from "react-spring";
import CardData from "../../data/CardData";
import "./CardView.css";

export default (props)=>{
	const symbolImages=[
		SuitSymbolImage0,
		SuitSymbolImage1,
		SuitSymbolImage2,
		SuitSymbolImage3
	];

/*	let style={
		opacity: 1,
		transform:
	};*/

	if (props.value===undefined) {
		useSpring({
			opacity: 0,
			transform: "translate(0px,-50px)",
			filter: "brightness(100%) blur(0px)",
		});
	}

	else if (props.darken) {
		style=useSpring({
			opacity: 1,
			transform: "translate(0px,0px)",
			filter: "brightness(66%) blur(2px)",
		});
	}

	else if (props.highlight) {
		style=useSpring({
			opacity: 1,
			transform: "translate(0px,-10px)",
			filter: "brightness(100%) blur(0px)"
		});
	}

	else {
		style=useSpring({
			opacity: 1,
			transform: "translate(0px,0px)",
			filter: "brightness(100%) blur(0px)"
		});
	}

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
		<animated.div class={props.class+" card"} style={{...style,...props.style}}>
			<CardContents/>
		</animated.div>
	);
}