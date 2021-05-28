import "preact/debug";
import TonopahClient from "./app/TonopahClient";

for (let el of document.getElementsByClassName("tonopah-client")) {
	let client=(
		<TonopahClient 
			serverUrl={el.dataset.serverUrl}
			mock={el.dataset.mock}
			mockReply={el.dataset.mockReplies}
			accountLink={el.dataset.accountLink}
			howtoLink={el.dataset.howtoLink}
			loginLink={el.dataset.loginLink}/>
	);

	render(client,el);
}
