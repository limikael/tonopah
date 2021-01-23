import ChipImage0 from "../assets/chip0.png";
import ChipImage1 from "../assets/chip1.png";
import ChipImage2 from "../assets/chip2.png";
import ChipImage3 from "../assets/chip3.png";
import ChipImage4 from "../assets/chip4.png";
import ArrayUtil from "../../utils/ArrayUtil";
import "./ChipsView.css";

export default (props)=>{
	let denominations=[500000, 100000, 25000, 5000, 1000, 500, 100, 25, 5, 1];
	let chipImages=[ChipImage0, ChipImage1, ChipImage2, ChipImage3, ChipImage4];
	let chipColors=["#404040","#008000","#808000","#000080","#ff0000"];

	function ChipStack(props) {
		let textStyle={
			top: (12-props.height*5)+"px",
			color: props.color
		};

		return (
			<div class="chips-stack-container" style={props.style}>
				{ArrayUtil.range(props.height).map(i=>{
					let style={
						top: (-i*5)+"px"
					};

					return (
						<img class="chips-image"
							src={props.image}
							style={style}/>
					);
				})}
				<div class="chips-text" style={textStyle}>{props.text}</div>
			</div>
		);
	}

	let stacks=[];
	let pos=0;
	let value=props.value;

	for (let i=0; i<denominations.length; i++) {
		let denomination=denominations[i];

		if (value>=denomination) {
			let height=Math.floor(value/denomination);
			value-=height*denomination;

			let text=denomination;
			if (text>=1000)
				text=Math.round(text/1000)+"K";

			let style={
				left: pos+"px"
			};

			pos+=40;

			stacks.push(
				<ChipStack
						image={chipImages[i%chipImages.length]}
						color={chipColors[i%chipImages.length]}
						text={text}
						height={height}
						style={style}/>
			);
		}
	}

	let left=(-pos/2);
	if (props.align=="L")
		left=0;

	if (props.align=="R")
		left=(-pos);

	let innerStyle={
		left: left+"px"
	};

	return (
		<div class="chips-container" style={props.style}>
			<div class="chips-container-inner" style={innerStyle}>
				{stacks}
			</div>
		</div>
	);
}