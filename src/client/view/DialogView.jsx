import "./DialogView.css";
import {useState} from "react";
import {If} from "../../utils/ReactUtil";

export default function DialogView(props) {
	let [dialogValue,setDialogValue]=useState(props.state.dialogValue);

	function onInputChange(e) {
		setDialogValue(e.target.value);
	}

	function onButtonClick(index) {
		console.log("button click, val="+dialogValue);

		setDialogValue(null);

		props.onButtonClick(index,dialogValue);
	}

	//console.log("dialog value: "+dialogValue);

	return (<Fragment>
		<div class="dialog-cover" />
		<div class="dialog-container">
			<div class="dialog-text">
				{props.state.dialogText.split("\n").map(s=>
					<p>{s}</p>
				)}
				{If(dialogValue!==null,()=>
					<input type="text" value={dialogValue} onChange={onInputChange}/>
				)}
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