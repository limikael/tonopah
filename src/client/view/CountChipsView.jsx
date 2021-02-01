import ChipsView from "../view/ChipsView";
import {useRef, useEffect, useState} from "react";
import {useSpring, animated, config} from "react-spring";

function useDiff(value) {
	if (!value)
		value=0;

	let ref=useRef({
		value: 0,
		diff: 0
	});

	let diff=ref.current.diff;
	let reset=false;

	if (value!=ref.current.value) {
		diff=value-ref.current.value;
		ref.current.value=value;
		ref.current.diff=diff;
		reset=true;
	}

	if (diff<0) {
		diff=0;
		reset=false;
	}

	return [diff,reset];
}

export default (props)=>{
	let [diff,reset]=useDiff(props.value);
	let ref=useRef();

	let style=useSpring({
		immediate: !ref.current,
		left: props.style.left,
		top: props.style.top,
		transform: props.style.transform,
		opacity: 0.5,
		reset: reset,
		config: config.slow,
		from: {
			transform: "translate(0px,0px)",
			opacity: 1
		}
	});

	return (
		<ChipsView
			ref={ref}
			value={diff}
			style={style}
			class={props.class} />
	);
}