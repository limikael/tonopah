import {useContext} from "react";
import ContentScaler from "../../src/utils/ContentScaler";
import "./ContentScalerTest.css";

function MyContent(props) {
	let orientation=useContext(ContentScaler.OrientationContext);

	console.log("rendeing content: "+orientation);

	return (
		<div class="mycontent">
			hello: {orientation}
		</div>
	);
}

export default function ContentScalerTest(props) {
	let content=<MyContent/>

	return (
		<ContentScaler width="640" height="480"
				portraitWidth="480" portraitHeight="640">
			{content}
		</ContentScaler>
	);
}