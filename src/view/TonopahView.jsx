import TableImage from "../assets/sprites/table.png";
import SeatView from "./SeatView";
import Sprite from "../utils/Sprite";
import { If } from "../utils/ReactUtil";
import Positions from "./Positions.js";
import StateClient from "../utils/StateClient";
import { useContext } from 'preact/compat';

export default (props)=>{
	let ctx=useContext(StateClient.Context);

	function onSeatClick(index) {
		ctx.send("seatClick",{
			seatIndex: index
		});
	}

	return (
		<Fragment>
			<Sprite src={TableImage} pos={Positions.tablePosition}/>
			{Positions.seatPositions.map((pos, index)=>
				<SeatView pos={pos} seatIndex={index}
						onClick={onSeatClick.bind(null,index)}/>
			)}
		</Fragment>
	);
}