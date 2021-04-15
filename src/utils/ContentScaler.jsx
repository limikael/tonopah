import {h, render} from 'preact';
import {useEffect, useState, useRef} from 'preact/hooks';
import {createContext} from "react";
import "./ContentScaler.css";

export default function ContentScaler(props) {
	const [windowSize,setWindowSize]=useState({width: 0, height: 0});

	let ref=useRef();

	useEffect(()=>{
		function updateSize() {
			setWindowSize({
				width: ref.current.clientWidth,
				height: ref.current.clientHeight
			});
		}

		updateSize();
		window.addEventListener("resize",updateSize);

		return ()=>{
			window.removeEventListener("resize",updateSize);
		}
	},[]);

	let useWidth=props.width;
	let useHeight=props.height;
	let orientation="landscape"

	if (windowSize.height>windowSize.width) {
		useWidth=props.portraitWidth||props.width;
		useHeight=props.portraitHeight||props.height;
		orientation="portrait";
	}

	let scale;
	if (windowSize.width / useWidth < windowSize.height / useHeight)
		scale = windowSize.width / useWidth;

	else
		scale = windowSize.height / useHeight;		

	let scaledWidth = useWidth * scale;
	let scaledHeight = useHeight * scale;		
	let posX = (windowSize.width - scaledWidth) / 2;
	let posY = (windowSize.height - scaledHeight) / 2;
	let transform=`translate(${posX}px,${posY}px) scale(${scale})`;

	let innerStyle={
		"width": useWidth+"px",
		"height": useHeight+"px",
		"transform": transform,
	};

	let content=props.children;
	if (!ref.current)
		content=null;

	return (
		<ContentScaler.OrientationContext.Provider value={orientation}>
			<div ref={ref} class={orientation+" content-scaler-outer"}>
				<div style={innerStyle} class="content-scaler-inner">
					{content}
				</div>
			</div>
		</ContentScaler.OrientationContext.Provider>
	);
}

ContentScaler.OrientationContext=createContext();
