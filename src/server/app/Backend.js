const fetch=require("node-fetch");
const { URLSearchParams } = require('url');

class Backend {
	constructor(url, key) {
		this.url=url;
		this.key=key;
	}

	async fetch(params) {
		//console.log("Backend call: "+params.call+": "+JSON.stringify(params));
		let postParams=new URLSearchParams();
		for (let name in params)
			postParams.append(name,params[name]);

		if (this.key)
			postParams.append("key",this.key);

		let fetchRes=await fetch(this.url,{
			method: "POST",
			body: postParams
		});

		let res=await fetchRes.json();
		if (fetchRes.status!=200 || !res.ok)
			throw new Error(res.message);

		//console.log("...done");
		return res;
	}
}

module.exports=Backend;
