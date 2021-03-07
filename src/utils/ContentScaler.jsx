import {h, render} from 'preact';
import {useEffect, useState, useRef} from 'preact/hooks';
import "./ContentScaler.css";

export default (props)=>{
	const [elWidth,setElWidth]=useState(0);
	const [elHeight,setElHeight]=useState(0);

	let ref=useRef();

	useEffect(()=>{
		setElWidth(ref.current.clientWidth);
		setElHeight(ref.current.clientHeight);

		function onResize() {
			setElWidth(ref.current.clientWidth);
			setElHeight(ref.current.clientHeight);
		}

		window.addEventListener("resize",onResize);

		return ()=>{
			window.removeEventListener("resize",onResize);
		}
	});

	let scale;

	if (elWidth / props.width < elHeight / props.height)
		scale = elWidth / props.width;

	else
		scale = elHeight / props.height;		

	let scaledWidth = props.width * scale;
	let scaledHeight = props.height * scale;		
	let posX = (elWidth - scaledWidth) / 2;
	let posY = (elHeight - scaledHeight) / 2;
	let transform=`translate(${posX}px,${posY}px) scale(${scale})`;

	let innerStyle={
		"width": props.width+"px",
		"height": props.height+"px",
		"transform": transform,
	};

	return (
		<div ref={ref} class="content-scaler-outer">
			<div style={innerStyle} class="content-scaler-inner">
				{props.children}
			</div>
		</div>
	);
}
