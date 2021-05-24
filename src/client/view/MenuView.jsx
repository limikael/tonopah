import "./MenuView.css";
import MenuButton from "../assets/menu.svg";
import {useState} from "react";

export default function MenuView(props) {
	let [menuVisible,setMenuVisible]=useState(false);

	function toggleMenu(e) {
		console.log("toggle");
		setMenuVisible(!menuVisible);
		e.preventDefault();
	}

	function menuClick(index,e) {
		e.preventDefault();
		setMenuVisible(false);
		console.log("menu entry: "+index);
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
		menuA.push(
			<a href="#" onclick={menuClick.bind(null,i)}>
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