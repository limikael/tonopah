import ReactUtil from "../../utils/ReactUtil";
import PotView from "./PotView";
import TableImage from "../assets/table.png";
import SeatView from "./SeatView";
import ButtonsView from "./ButtonsView";
import DialogView from "./DialogView";
import CardView from "./CardView";
import ArrayUtil from "../../utils/ArrayUtil";
import "./TonopahView.css";

export default function TonopahView(props) {
	function onSeatClick(index) {
		props.state.send({
			action: "seatJoin",
			seatIndex: index
		});
	}

	function onButtonClick(index, value) {
		props.state.send({
			action: props.state.buttons[index].action,
			value: value
		});
	}

	function onDialogButtonClick(index, value) {
		props.state.send({
			action: props.state.dialogButtons[index].action,
			value: value
		});
	}

	let communityCards=props.state.communityCards;
	if (!communityCards)
		communityCards=[];

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
						onClick={onSeatClick.bind(null,index)}
						key={index}/>
			)}
			{ReactUtil.If(props.state.highlightCards,()=>
				<div class="table-card-highlight">
					{props.state.highlightCards.text}
				</div>
			)}
			{ReactUtil.If(props.state.infoText,()=>
				<div class="table-info">
					{props.state.infoText}
				</div>
			)}
			{ReactUtil.If(props.state.buttons && props.state.buttons.length,()=>
				<ButtonsView state={props.state} 
						onButtonClick={onButtonClick}/>
			)}
			{ReactUtil.If(props.state.dialogText,()=>
				<DialogView state={props.state} 
						onButtonClick={onDialogButtonClick}/>
			)}
		</div>
	);
}