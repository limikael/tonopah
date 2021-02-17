import { h, Component } from 'preact';
//import {useRef, useEffect, useState} from "react";
//import {useRef, useEffect, useState} from "preact-compat";

export class Select {
	onChange=(e)=>{
		if (this.props.onChange)
			this.props.onChange(JSON.parse(e.target.value));

		if (this.props.onIndexChange)
			this.props.onIndexChange(e.target.selectedIndex);
	}

	render() {
		let props=this.props;

		if (!props.labelField)
			props.labelField="label";

		if (!props.options)
			props.options=[];

		return (
			<select class={props.class}
					style={props.style}
					onChange={this.onChange}
					key={props.key}>
				{props.options.map((option, index)=>{
					let selected=false;

					if (props.hasOwnProperty('selectedIndex') &&
							index===props.selectedIndex)
						selected=true;

					if (props.hasOwnProperty('selected') &&
							option.key===props.selected)
						selected=true;

					let key=option.key;
					if (props.hasOwnProperty('optionKeyPrefix'))
						key=props.keyPrefix+key;

					return (
						<option key={key}
								value={JSON.stringify(option.key)}
								selected={selected}
								class={option.class}>
							{option[props.labelField]}
						</option>
					);
				})}
			</select>
		);
	}
}

export function If(cond,func) {
	if (cond)
		return func();
}

export function useLastValueDiff(value) {
	if (!value)
		value=0;

	let ref=useRef({
		value: 0,
		diff: 0
	});

	let diff=ref.current.diff;

	if (value!=ref.current.value) {
		diff=value-ref.current.value;
		ref.current.value=value;
		ref.current.diff=diff;
	}

	if (diff<0)
		diff=0;

	return diff;
}

export function useIsValueChanged(value) {
	let ref=useRef();
	let change=false;

	if (value!=ref.current)
		change=true;

	ref.current=value;

	return change;
}

export function usePerformanceNow() {
	const frame = useRef();
	const [performanceNow,setPerformanceNow]=useState(performance.now());

	function animate() {
		setPerformanceNow(performance.now());
		frame.current=requestAnimationFrame(animate);
	}

	useEffect(() => {
		//console.log("use eff..");
		frame.current = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(frame.current);
	},[]);

	return performanceNow;
}


export default {
	If: If,
	Select: Select
};