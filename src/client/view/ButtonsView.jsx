import BigButtonImage from "../assets/bigButton.png";
import ReactUtil from "../../utils/ReactUtil";
import "./ButtonsView.css";
import {useState} from "react";
import CurrencyFormatter from "../../utils/CurrencyFormatter.mjs";

export default (props)=>{
	let buttons=props.state.buttons;
	let [sliderVal,setSliderVal]=useState(0);

	function onSliderChange(e) {
		setSliderVal(e.target.value);
	}

	function getButtonValue(index) {
		if (index==2 && props.state.sliderMax) {
			let min=props.state.buttons[2].value;
			let max=props.state.sliderMax;
			let stake=props.state.stake;
			/*if (!stake)
				stake=1;*/

			let logmin=Math.log(min);
			let logmax=Math.log(max);
			let scale=logmax-logmin;
			let v=Math.exp(logmin+scale*sliderVal);

			if (Math.abs(v-min)<stake/2)
				return min;

			if (Math.abs(v-max)<stake/2)
				return max;

			if (stake<1) {
				let oneoverstake=1/stake;
				return Math.round(v*oneoverstake)/oneoverstake;
			}

			else {
				return stake*Math.round(v/stake);
			}
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
				if (value) {
					let currencyFormatter=new CurrencyFormatter(props.state);
					value=currencyFormatter.format(value,"number");
				}

				else
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