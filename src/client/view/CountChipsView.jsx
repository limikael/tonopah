import ChipsView from "../view/ChipsView";
import {useRef, useEffect} from "react";
import {useSpring, animated, config} from "react-spring";

export default (props)=>{
	let ref=useRef();
	useEffect(()=>{
		ref.current=props.value;
	});

	let style={
		"left": props.style.left,
		"top": props.style.top
	};

	let diff=0;
   	if (props.value && ref) {
		diff=props.value-ref.current;
		let x=100;
		let y=100;

		style=useSpring({
			"left": props.style.left,
			"top": props.style.top,
			transform: `translate(${x}px,${y}px)`,
			opacity: 0.5,
			reset: true,
			config: config.slow,
			from: {
				transform: "translate(0px,0px)",
				opacity: 1
			}
		});
	}

	console.log("render");

	return (
		<ChipsView
			value={diff}
			style={style}
			class={props.class} />
	);
}