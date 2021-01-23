import ChipsView from "./ChipsView";

export default (props)=>{
	const potPosition=[485, 315];

	let style={
		left: potPosition[0]+"px",
		top: potPosition[1]+"px"
	};

	let pots=props.state.pots;
	if (!pots)
		pots=[];

	let tot=0;
	for (let pot of pots)
		tot+=pot;

	return (
		<div class="pot-container">
			<ChipsView style={style} value={tot} />
		</div>
	)
}