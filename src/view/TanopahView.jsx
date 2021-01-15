import TableImage from "../assets/sprites/table.png";
import ContentScaler from "../utils/ContentScaler";
import SeatView from "./SeatView";
import Sprite from "../utils/Sprite";
import Positions from "./Positions.js";

export default ({children, ...props})=>
	<ContentScaler width={960} height={720}>
		<Sprite src={TableImage} pos={Positions.tablePosition}/>
		{Positions.seatPositions.map((pos, index)=>
			<SeatView pos={pos}/>
		)}
	</ContentScaler>