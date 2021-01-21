import CardBackImage from "../assets/sprites/cardBack.png";
import CardFrameImage from "../assets/sprites/cardFrame.png";
import SuitSymbolImage0 from "../assets/sprites/suitSymbol0.png";
import SuitSymbolImage1 from "../assets/sprites/suitSymbol1.png";
import SuitSymbolImage2 from "../assets/sprites/suitSymbol2.png";
import SuitSymbolImage3 from "../assets/sprites/suitSymbol3.png";
import CardData from "../data/CardData";
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
			<div class={props.class+" card"}>
				<img class="card-image" src={CardFrameImage}/>
				<img class="card-symbol-image" src={symbolImages[cardData.getSuitIndex()]}/>
				<div class="card-symbol-text" style={cardTextStyle}>
					{cardData.getCardValueString()}
				</div>
			</div>
		);
	}
}