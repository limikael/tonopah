import ArrayUtil from "../../utils/ArrayUtil";
import ReactUtil from "../../utils/ReactUtil";
import TableImage from "../assets/table.png";
import SeatView from "./SeatView";
import CardView from "./CardView";
import PotView from "./PotView";
import ButtonsView from "./ButtonsView";
import "./TonopahView.css";

export default (props)=>{
	function onSeatClick(index) {
		props.state.send({
			action: "seatJoin",
			seatIndex: index
		});
	}

	function onButtonClick(index) {
		props.state.send({
			action: props.state.buttons[index].action,
			value: props.state.buttons[index].value
		});
	}

	let communityCards=props.state.communityCards;
	if (!communityCards)
		communityCards=[];

	//console.log(props.state);

	return (
		<div class="tonopah-table">
			<img src={TableImage} class="tonopah-table-image"/>
			<div class="table-card-container">
				{ArrayUtil.range(5).map((index)=>{
					let darken=false;
					let highlight=false;

					if (props.state.highlightCards) {
						if (props.state.highlightCards.communityCards.indexOf(index)>=0)
							highlight=true;

						else
							darken=true;
					}

					let style={
						left: `${index*91}px`
					}
					return (
						<CardView value={communityCards[index]} style={style}
								highlight={highlight} darken={darken}/>
					);
				})}
			</div>
			<PotView state={props.state}/>
			{ArrayUtil.range(10).map(index=>
				<SeatView state={props.state} seatIndex={index}
						onClick={onSeatClick.bind(null,index)}/>
			)}
			{ReactUtil.If(props.state.highlightCards,()=>
				<div class="table-card-highlight">
					{props.state.highlightCards.text}
				</div>
			)}
			{ReactUtil.If(props.state.buttons && props.state.buttons.length,()=>
				<ButtonsView state={props.state} 
						onButtonClick={onButtonClick}/>
			)}
		</div>
	);
}