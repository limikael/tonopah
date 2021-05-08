import "./DialogView.css";
import {useState} from "react";
import {If} from "../../utils/ReactUtil";
import CurrencyFormatter from "../../utils/CurrencyFormatter.mjs";

export default function DialogView(props) {
	let [dialogValue,setDialogValue]=useState(props.state.dialogValue);

	function onSliderChange(e) {
		setDialogValue(e.target.value);
	}

	function onButtonClick(index) {
		props.state.setLocal(props.state.promptId);
		props.onButtonClick(index,dialogValue);
	}

	let currecyFormatter=new CurrencyFormatter(props.state);
	let dividedDialogValue=currecyFormatter.format(dialogValue,"number");

	return (<Fragment>
		<div class="dialog-cover" />
		<div class="dialog-container">
			<div class="dialog-text">
				{props.state.dialogText.split("\n").map(s=>
					<p>{s}</p>
				)}
				{If(dialogValue,()=>{
					return (
						<Fragment>
							<input type="text" value={dividedDialogValue} disabled/>
							<div class="dialog-slider-holder">
								<input type="range" class="button-slider"
										min={props.state.dialogValue}
										max={props.state.dialogMaxValue}
										value={dialogValue}
										step={props.state.stake}
										onChange={onSliderChange}/>
							</div>
						</Fragment>
					);
				})}
			</div>
			<div class="dialog-button-container">
				{props.state.dialogButtons.map((buttonData,index)=>
					<button class="dialog-button"
							onClick={onButtonClick.bind(null,index)}>
						{buttonData.label}
					</button>
				)}
			</div>
		</div>
	</Fragment>);
};