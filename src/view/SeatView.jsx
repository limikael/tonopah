import SeatPlateImage from "../assets/sprites/seatPlate.png";
import Sprite from "../utils/Sprite";
import Container from "../utils/Container";

export default ({children, ...props})=>{
	return (
		<Container pos={props.pos}>
			<Sprite src={SeatPlateImage} pos={[-80,-35]}/>
		</Container>
	);
}
