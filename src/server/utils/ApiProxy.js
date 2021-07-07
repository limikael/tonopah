import url from "url";

export default class ApiProxy {
	constructor(api) {
		this.api=api;
	}

	canHandle(req) {
		let u=url.parse(req.url);
		let path=u.pathname.split("/").filter(x=>x);
		let funcName=path[0];

		if (funcName!="constructor" && this.api[funcName])
			return true;
	}

	handleCall=async (req, res)=>{
		//console.log(req);

		let u=url.parse(req.url);
		let path=u.pathname.split("/").filter(x=>x);
		let searchParams=new URLSearchParams(u.query);
		let params=Object.fromEntries(searchParams)
		let funcName=path[0];
		params._=path.slice(1);

		if (!funcName) {
			res.end("Missing function.\n");
			return;
		}

		if (!this.api[funcName]) {
			res.end("Unknown function: "+funcName+"\n");
			return;
		}

		try {
			let result=await this.api[funcName](params);
			if (!result)
				result={};

			result.ok=1;
			res.end(JSON.stringify(result,null,2)+"\n");
		}

		catch (e) {
			console.log("Error while processing api call");
			console.log(e.stack);
			res.end("Error: "+String(e)+"\n");
		}
	}
}
