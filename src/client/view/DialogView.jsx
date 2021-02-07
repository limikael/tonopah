import "./DialogView.css";

export default function DialogView(props) {
	return (<Fragment>
		<div class="dialog-cover" />
		<div class="dialog-container">
			<div class="dialog-text">
				<p>
					{props.state.dialogText}
				</p>
				<input type="text"/>
			</div>
			<div class="dialog-button-container">
				<button class="dialog-button">bla</button>
				<button class="dialog-button">bluu</button>
			</div>
		</div>
	</Fragment>);
};