import {useEffect, useState, useRef} from 'preact/hooks';

export default ({children, ...props})=>{
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

	let outerStyle={
		"position": "absolute",
		"width": "100%",
		"height": "100%",
		"overflow": "hidden",
	};

	let innerStyle={
		"transform": transform,
		"transform-origin": "0 0",
		"position": "absolute",
		"top": "0",
		"left": "0",
		"width": props.width+"px",
		"height": props.height+"px",
	};

	return (
		<div ref={ref} style={outerStyle}>
			<div style={innerStyle}>
				{children}
			</div>
		</div>
	);
}
