import SeatPlateImage from "../assets/seatPlate.png";
import CardView from "./CardView";
import "./SeatView.css";

export default (props)=>{
	const seatPositions=[
		[287, 118], [483, 112], [676, 118], [844, 247], [817, 413],
		[676, 490], [483, 495], [287, 490], [140, 413], [123, 247]
	];

	let seatData=props.state.seats[props.seatIndex];

	if (seatData.hasOwnProperty("active") && !seatData.active)
		return null;

	let containerStyle={
		"left": seatPositions[props.seatIndex][0]+"px",
		"top": seatPositions[props.seatIndex][1]+"px",
	};

	let cards=seatData.cards;
	if (!cards)
		cards=[];

	return (
		<div class="seat-container"	onClick={props.onClick}
				style={containerStyle}>
			<div class="seat-card-container">
				{cards.map(value=>
					<CardView class="seat-card" value={value}/>
				)}
			</div>
			<img class="seat-image" src={SeatPlateImage}/>
			<div class="seat-name-text">{seatData.user}</div>
			<div class="seat-chips-text">{seatData.chips}</div>
		</div>
	);
}
