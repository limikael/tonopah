import "preact/debug";
import ContentScalerTest from "./ContentScalerTest";

for (let el of document.getElementsByClassName("content-scaler-test")) {
	render(<ContentScalerTest />,el);
}
