import ChipsView from "../view/ChipsView";
import {useRef, useEffect, useState} from "react";
import {useSpring, animated, config} from "react-spring";
import {useLastValueDiff, useIsValueChanged} from "../../utils/ReactUtil";

export default (props)=>{
	let diff=useLastValueDiff(props.value);
	let isChanged=useIsValueChanged(props.value);
	let ref=useRef();
	let transform=props.style.transform;
	let fromTransform="translate(0px,0px)";

	if (props.backward) {
		transform="translate(0px,0px)";
		fromTransform=props.style.transform;
	}

	let [style,setStyle]=useSpring(()=>({
		left: props.style.left,
		top: props.style.top,
		config: config.slow,
		transform: fromTransform,
		opacity: 0,
	}));

	if (ref.current && isChanged) {
		setStyle({
			opacity: 1,
			transform: fromTransform,
			immediate: true,
		});

		setStyle({
			opacity: 0,
			transform: transform,
			immediate: false,
		});
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