import SeatPlateImage from "../assets/sprites/seatPlate.png";
import Sprite from "../utils/Sprite";
import Container from "../utils/Container";
import StateClient from "../utils/StateClient";
import { useContext } from 'preact/compat';

export default (props)=>{
	let ctx=useContext(StateClient.Context);
	let data=ctx.seats[props.seatIndex];

	return (
		<Container pos={props.pos} onClick={props.onClick}>
			<Sprite src={SeatPlateImage} pos={[-80,-35]}/>
			<Container>
				{data.user}
			</Container>
		</Container>
	);
}
