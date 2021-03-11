import url from "url";

export default class WsExtraServer {
	static decorateWebSocket(ws, req) {
		let searchParams=new URLSearchParams(url.parse(req.url).query);
		ws.parameters=Object.fromEntries(searchParams);
	}
}
