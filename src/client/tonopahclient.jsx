import "preact/debug";
import TonopahClient from "./app/TonopahClient";

for (let el of document.getElementsByClassName("tonopah-client"))
	render(<TonopahClient {...el.dataset}/>,el);
