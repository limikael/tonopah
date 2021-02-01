import ContentScaler from "../../utils/ContentScaler";
import ReactUtil from "../../utils/ReactUtil";
import ChipsView from "../view/ChipsView";
import CountChipsView from "../view/CountChipsView";
import { useState } from "react";

export default (props)=>{
	let [value,setValue]=useState();
	let [dummyValue,setDummyValue]=useState(0);

	let style={
		width: "100%",
		height: "100%",
		position: "relative"
	};

	let chipsStyle={
		left: "100px",
		top: "100px",
		transform: "translate(200px,100px)",
	};

	let buttonsStyle={
		position: "absolute",
		top: 0
	};

	function buttonClick(v) {
		console.log("button clik...");
		setDummyValue(dummyValue+1);
		setValue(v);
	}

	return (
		<div style={style}>
			<ContentScaler width={960} height={720}>
				{ReactUtil.If(value!==undefined,()=>
					<CountChipsView
							style={chipsStyle}
							value={value}/>
				)}
			</ContentScaler>
			<div style={buttonsStyle}>
				<button onClick={buttonClick.bind(null,undefined)}>clear</button>
				<button onClick={buttonClick.bind(null,0)}>0</button>
				<button onClick={buttonClick.bind(null,200)}>200</button>
				<button onClick={buttonClick.bind(null,400)}>400</button>
				<button onClick={buttonClick.bind(null,600)}>600</button>
			</div>
		</div>
	);
}