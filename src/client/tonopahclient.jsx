import TonopahClient from "./app/TonopahClient";

for (let el of document.getElementsByClassName("tonopah-client")) {
	let client=(
		<TonopahClient 
			serverUrl={el.dataset.serverUrl}
			mock={el.dataset.mock}/>
	);

	render(client,el);
}
