//import {useSpring, animated} from "react-spring";
import CardData from "../../data/CardData";
import "./CardView.css";

export default (props)=>{
	const symbolImages=[
		"suitSymbol0.png",
		"suitSymbol1.png",
		"suitSymbol2.png",
		"suitSymbol3.png"
	];

	let staticStyle={
		overflow: "hidden",
		width: "87px"
	};

	let style={
		opacity: 1,
		transform: "translate(0px,0px)",
		filter: "brightness(100%) blur(0px)",
		height: "122px"
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

//	style=useSpring(style);

	function CardContents() {
		if (props.value===undefined)
			return null;

		if (props.value<0)
			return (
				<img class="card-image" src={props.assetUrl+"/cardBack.png"}/>
			);

		let cardData=new CardData(props.value);
		let cardTextStyle={
			color: cardData.getColor()
		};

		return (
			<Fragment>
				<img class="card-image" src={props.assetUrl+"/cardFrame.png"}/>
				<img class="card-symbol-image"
						src={props.assetUrl+symbolImages[cardData.getSuitIndex()]}/>
				<div class="card-symbol-text" style={cardTextStyle}>
					{cardData.getCardValueString()}
				</div>
			</Fragment>
		);
	}

	// these div should be animated.div
	return (
		<div class={props.class+" card"}
				style={{...style,...staticStyle,...props.style}}>
			<CardContents/>
		</div>
	);
}