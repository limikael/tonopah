const fetch=require("node-fetch");
const { URLSearchParams } = require('url');

class Backend {
	constructor(url) {
		this.url=url;
	}

	async fetch(params) {
		let postParams=new URLSearchParams();
		for (let key in params)
			postParams.append(key,params[key]);

		let fetchRes=await fetch(this.url,{
			method: "POST",
			body: postParams
		});

		let res=await fetchRes.json();
		if (fetchRes.status!=200 || !res.ok)
			throw new Error(res.message);

		return res;
	}
}

module.exports=Backend;