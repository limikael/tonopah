export default ({children, ...props})=>{
	let x=props.x;
	let y=props.y;

	if (props.pos) {
		x=props.pos[0];
		y=props.pos[1];
	}

	let style={
		left: `${x}px`,
		top: `${y}px`,
		position: "absolute"
	};

	return (
		<div style={style}>
			{children}
		</div>
	);
}
