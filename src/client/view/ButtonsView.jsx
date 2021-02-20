import BigButtonImage from "../assets/bigButton.png";
import ReactUtil from "../../utils/ReactUtil";
import "./ButtonsView.css";
import {useState} from "react";

export default (props)=>{
	let buttons=props.state.buttons;
	let [sliderVal,setSliderVal]=useState(0);

	function onSliderChange(e) {
		setSliderVal(e.target.value);
	}

	function getButtonValue(index) {
		if (index==2 && props.state.sliderMax) {

			console.log("yep, sliderval="+sliderVal);

			let minv=Math.log(props.state.buttons[2].value);
			let maxv=Math.log(props.state.sliderMax);
			let scale=maxv-minv;
			return Math.round(Math.exp(minv+scale*sliderVal));
		}

		else {
			return props.state.buttons[index].value;
		}
	}

	function onButtonClick(index) {
		props.onButtonClick(index,getButtonValue(index));
	}

	let cls="num-buttons-"+buttons.length;

	return (
		<div class={`button-container ${cls}`}>
			<div class="button-slider-container">
				{ReactUtil.If(props.state.sliderMax,()=>
					<input type="range" class="button-slider" 
						min="0" max="1"
						step="0.001"
						value={sliderVal}
						onchange={onSliderChange}/>
				)}
			</div>
			{buttons.map((button,index)=>{
				let value=getButtonValue(index);
				if (!value)
					value=null;

				let buttonLabel=button.label;
				if (!buttonLabel)
					buttonLabel=button.action;

				let style={
					left: `${index*105}px`
				};
				return (
					<div class="button-big-button" style={style}
							onClick={onButtonClick.bind(null,index)}>
						<img src={BigButtonImage}/>
						<div class="button-text">
							{buttonLabel}
						</div>
						<div class="button-value">
							{value}
						</div>
					</div>
				);
			})}
		</div>
	);
}