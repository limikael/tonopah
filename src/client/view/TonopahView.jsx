import ReactUtil from "../../utils/ReactUtil";
import PotView from "./PotView";
import StatusView from "./StatusView";
import TableImage from "../assets/table.png";
import MenuView from "./MenuView";
import SeatView from "./SeatView";
import ButtonsView from "./ButtonsView";
import DialogView from "./DialogView";
import CardView from "./CardView";
import ArrayUtil from "../../utils/ArrayUtil";
import "./TonopahView.css";
import {useSpring, animated, config} from "react-spring";
import {useIsValueChanged} from "../../utils/ReactUtil.jsx";
import {useRef, useContext} from "react";
import ContentScaler from "../../utils/ContentScaler";

export default function TonopahView(props) {
	let orientation=useContext(ContentScaler.OrientationContext);
	let newTournamentTable=useIsValueChanged(props.state.tournamentTableIndex);
	let mainRef=useRef();

	function onSeatClick(index) {
		if (!props.state.user) {
			window.open(props.settings.loginLink,"_top");
			return;
		}

		props.state.send({
			action: "seatJoin",
			seatIndex: index
		});
	}

	function onButtonClick(index, value) {
		props.state.send({
			action: props.state.buttons[index].action,
			value: value
		});
	}

	function onDialogButtonClick(index, value) {
		props.state.send({
			action: props.state.dialogButtons[index].action,
			value: value
		});
	}

	function onMenuClick(index) {
		let menuEntry=props.state.menu[index];

		if (menuEntry.url) {
			let target="tonopah-secondary";
			if (menuEntry.url=="loginLink")
				target="_top";

			let url=props.settings[menuEntry.url];
			window.open(url,target);
		}

		if (menuEntry.action) {
			props.state.send({
				action: menuEntry.action,
				value: menuEntry.value
			});
		}
	}

	let communityCards=props.state.communityCards;
	if (!communityCards)
		communityCards=[];

	[mainSpring,setMainSpring]=useSpring(()=>({
		opacity: 1,
		config: config.molasses
	}));

	if (newTournamentTable && mainRef.current) {
		setMainSpring({opacity: 0, immediate: true});
		setMainSpring({opacity: 1, immediate: false});
	}

	let communityCardsDist=91;
	if (orientation=="portrait")
		communityCardsDist=30;

	return (
		<animated.div style={mainSpring} class="tonopah-table" ref={mainRef}>
			<img src={TableImage} class="tonopah-table-image"/>
			<div class="tonopah-table-button-holder"/>
			<div class="table-card-container">
				{ArrayUtil.range(5).map((index)=>{
					let darken=false;
					let highlight=false;

					if (props.state.highlightCards) {
						if (props.state.highlightCards.communityCards.indexOf(index)>=0)
							highlight=true;

						else
							darken=true;
					}

					let style={
						left: `${index*communityCardsDist}px`
					}
					return (
						<CardView value={communityCards[index]} style={style}
								highlight={highlight} darken={darken}
								state={props.state}/>
					);
				})}
			</div>
			<PotView state={props.state}/>
			{ArrayUtil.range(10).map(index=>
				<SeatView state={props.state} seatIndex={index}
						onClick={onSeatClick.bind(null,index)}
						key={index}/>
			)}
			{ReactUtil.If(props.state.highlightCards,()=>
				<div class="table-card-highlight">
					{props.state.highlightCards.text}
				</div>
			)}
			{ReactUtil.If(props.state.infoText,()=>
				<div class="table-info">
					{props.state.infoText}
				</div>
			)}
			{ReactUtil.If(props.state.statusText,()=>
				<StatusView state={props.state} />
			)}
			{ReactUtil.If(props.state.buttons && props.state.buttons.length,()=>
				<ButtonsView state={props.state} 
						onButtonClick={onButtonClick}/>
			)}
			{ReactUtil.If(props.state.dialogText
					&& props.state.promptId!=props.state.local,()=>
				<DialogView state={props.state} 
						onButtonClick={onDialogButtonClick}/>
			)}
			<MenuView state={props.state}
					onMenuClick={onMenuClick}/>
		</animated.div>
	);
}