import SeatPlateImage from "../assets/seatPlate.png";
import DealerButtonImage from "../assets/dealerButton.png";
import CardView from "./CardView";
import ReactUtil from "../../utils/ReactUtil";
import "./SeatView.css";

export default (props)=>{
	const seatPositions=[
		[287,118], [483,112], [676,118], [844,247], [817,413],
		[676,490], [483,495], [287,490], [140,413], [123,247]
	];

	const dealerButtonPositions=[
		[60,15], [-88,21], [-102,15], [-82,20], [-102,-55],
		[-102,-56], [53,-63], [64,-58], [53,-51], [45,19]
	];

	/*[-62,32],[-5,38],[54,32],[-66,-51],[-69,-91]
	[43,-130],[-2,-135],[-55,-130],[59,-91],[58,-47]*/

	let seatData=props.state.seats[props.seatIndex];

	if (seatData.hasOwnProperty("active") && !seatData.active)
		return null;

	let containerStyle={
		"left": seatPositions[props.seatIndex][0]+"px",
		"top": seatPositions[props.seatIndex][1]+"px",
	};

	let dealerButtonStyle={
		"left": dealerButtonPositions[props.seatIndex][0]+"px",
		"top": dealerButtonPositions[props.seatIndex][1]+"px",
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
			{ReactUtil.If(props.seatIndex==props.state.dealerIndex,()=>
				<img class="seat-dealer-button" src={DealerButtonImage}
						style={dealerButtonStyle}/>
			)}
		</div>
	);
}
