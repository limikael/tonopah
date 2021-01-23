import TableImage from "../assets/table.png";
import BigButtonImage from "../assets/bigButton.png";
import SeatView from "./SeatView";
import ArrayUtil from "../../utils/ArrayUtil";
import CardView from "./CardView";
import PotView from "./PotView";
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

	let buttons=props.state.buttons;
	if (!buttons)
		buttons=[];

	return (
		<div class="tonopah-table">
			<img src={TableImage} class="tonopah-table-image"/>
			<div class="table-card-container">
				{ArrayUtil.range(5).map((index)=>{
					let style={
						left: `${index*91}px`
					}
					return (<CardView value={communityCards[index]} style={style}/>);
				})}
			</div>
			<PotView state={props.state}/>
			{ArrayUtil.range(10).map(index=>
				<SeatView state={props.state} seatIndex={index}
						onClick={onSeatClick.bind(null,index)}/>
			)}
			<div class="table-button-container">
				{buttons.map((button,index)=>{
					let style={
						left: `${index*105}px`
					};
					return (
						<div class="table-button" style={style}
								onClick={onButtonClick.bind(null,index)}>
							<img src={BigButtonImage}/>
							<div class="table-button-text">
								{button.action}
							</div>
							<div class="table-button-value">
								{button.value}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}