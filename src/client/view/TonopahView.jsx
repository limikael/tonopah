import TableImage from "../assets/table.png";
import SeatView from "./SeatView";
import ArrayUtil from "../../utils/ArrayUtil";
import CardView from "./CardView";
import "./TonopahView.css";

export default (props)=>{
	function onSeatClick(index) {
		props.state.send("seatJoin",{
			seatIndex: index
		});
	}

	let communityCards=props.state.communityCards;
	if (!communityCards)
		communityCards=[];

	return (
		<div class="tonopah-table">
			<img src={TableImage} class="tonopah-table-image"/>
			{ArrayUtil.range(10).map(index=>
				<SeatView state={props.state} seatIndex={index}
						onClick={onSeatClick.bind(null,index)}/>
			)}
			<div class="table-card-container">
				{communityCards.map((value,index)=>{
					let style={
						left: `${index*91}px`
					}
					return (<CardView value={value} style={style}/>);
				})}
			</div>
		</div>
	);
}