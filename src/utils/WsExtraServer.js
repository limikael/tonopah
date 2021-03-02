const url=require("url");

class WsExtraServer {
	static decorateWebSocket(ws, req) {
		let searchParams=new URLSearchParams(url.parse(req.url).query);
		ws.parameters=Object.fromEntries(searchParams);
	}
}

module.exports=WsExtraServer;