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

	function menuClick(menuEntry,e) {
		e.preventDefault();
		setMenuVisible(false);
		props.onMenuClick(menuEntry);
	}

	let menuStyle={
		display: menuVisible?"block":"none"
	};

	if (!menuVisible) return (
		<a href="#" class="tonopah-menu-button" onclick={toggleMenu}>
			<img src={MenuButton}/>
		</a>
	);

	let menuEntries=[];
	for (let menuEntry of props.settings.menu)
		menuEntries.push(menuEntry);

	for (let menuEntry of props.state.menu)
		menuEntries.push(menuEntry);

	let menuA=[];
	for (let menuEntry of menuEntries) {
		let img=null;
		if (menuEntry.checked)
			img=<img src={CheckBoxTick} />;

		let href="#";
		if (menuEntry.url)
			href=menuEntry.url

		menuA.push(
			<a href={href} onclick={menuClick.bind(null,menuEntry)}>
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