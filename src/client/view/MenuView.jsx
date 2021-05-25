import "./MenuView.css";
import MenuButton from "../assets/menu.svg";
import CheckBoxTick from "../assets/checkboxTick.png";
import {useState} from "react";

export default function MenuView(props) {
	let [menuVisible,setMenuVisible]=useState(false);

	function toggleMenu(e) {
		setMenuVisible(!menuVisible);
		e.preventDefault();
	}

	function menuClick(index,e) {
		e.preventDefault();
		setMenuVisible(false);
		props.onMenuClick(index);
	}

	let menuStyle={
		display: menuVisible?"block":"none"
	};

	if (!menuVisible) return (
		<a href="#" class="tonopah-menu-button" onclick={toggleMenu}>
			<img src={MenuButton}/>
		</a>
	);

	let menuA=[];
	for (let i in props.state.menu) {
		let menuEntry=props.state.menu[i];
		let img=null;
		if (menuEntry.checked)
			img=<img src={CheckBoxTick} />;

		menuA.push(
			<a href="#" onclick={menuClick.bind(null,i)}>
				{img}
				{menuEntry.text}
			</a>
		);
	}

	return (
		<Fragment>
			<div class="tonopah-menu-cover" onclick={toggleMenu}/>
			<a href="#" class="tonopah-menu-button" onclick={toggleMenu}>
				<img src={MenuButton}/>
			</a>
			<div class="tonopah-menu" style={menuStyle}>
				<div class="tonopah-menu-border"/>
				{menuA}
			</div>
		</Fragment>
	);
};