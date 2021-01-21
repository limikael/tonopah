import TableImage from "../assets/sprites/table.png";
import SeatView from "./SeatView";
import ArrayUtil from "../utils/ArrayUtil";
import "./TonopahView.css";

export default (props)=>{
	function onSeatClick(index) {
		props.state.send("seatJoin",{
			seatIndex: index
		});
	}

	return (
		<Fragment>
			<img src={TableImage} class="tonopah-table-image"/>
			{ArrayUtil.range(10).map(index=>
				<SeatView state={props.state} seatIndex={index}
						onClick={onSeatClick.bind(null,index)}/>
			)}
		</Fragment>
	);
}