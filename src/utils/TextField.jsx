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
		position: "absolute",
		"font-size": "20px",
		"font-weight": "bold",
		"width": `${props.width}px`,
		"text-align": "center"
	};

	return (
		<div style={style}>{children}</div>
	);
}
