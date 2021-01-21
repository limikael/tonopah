import CardBackImage from "../assets/cardBack.png";
import CardFrameImage from "../assets/cardFrame.png";
import SuitSymbolImage0 from "../assets/suitSymbol0.png";
import SuitSymbolImage1 from "../assets/suitSymbol1.png";
import SuitSymbolImage2 from "../assets/suitSymbol2.png";
import SuitSymbolImage3 from "../assets/suitSymbol3.png";
import CardData from "../../data/CardData";
import "./CardView.css";

export default (props)=>{
	const symbolImages=[
		SuitSymbolImage0,
		SuitSymbolImage1,
		SuitSymbolImage2,
		SuitSymbolImage3
	];

	if (props.value<0) {
		return (
			<div class={props.class+" card"}>
				<img class="card-image" src={CardBackImage}/>
			</div>
		);
	}

	else {
		let cardData=new CardData(props.value);
		let cardTextStyle={
			color: cardData.getColor()
		};

		return (
			<div class={props.class+" card"} style={props.style}>
				<img class="card-image" src={CardFrameImage}/>
				<img class="card-symbol-image" src={symbolImages[cardData.getSuitIndex()]}/>
				<div class="card-symbol-text" style={cardTextStyle}>
					{cardData.getCardValueString()}
				</div>
			</div>
		);
	}
}