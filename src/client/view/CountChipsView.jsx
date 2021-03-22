import ChipsView from "../view/ChipsView";
import {useRef, useEffect, useState} from "react";
import {useSpring, animated, config} from "react-spring";
import {useLastValueDiff, useIsValueChanged} from "../../utils/ReactUtil";

export default (props)=>{
	let diff=useLastValueDiff(props.value);
	let reset=useIsValueChanged(props.value);
	let ref=useRef();
	let transform=props.style.transform;
	let fromTransform="translate(0px,0px)";

	if (props.backward) {
		transform="translate(0px,0px)";
		fromTransform=props.style.transform;
	}

	let style=useSpring({
		immediate: !ref.current,
		left: props.style.left,
		top: props.style.top,
		transform: transform,
		opacity: 0,
		reset: reset,
		config: config.slow,
		from: {
			transform: fromTransform,
			opacity: 1
		}
	});

	if (reset) {
		style.transform.payload[0].setValue(0,true);
		style.opacity.setValue(1,true);
	}

	return (
		<ChipsView
			ref={ref}
			value={diff}
			style={style}
			class={props.class}
			align={props.align} />
	);
}