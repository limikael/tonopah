import fs from "fs";
import path from "path";
import tal from "template-tal";
import url from "url";
import {getReqParams} from "../utils/HttpUtil.js";

export default class MockContent {
	serve(res, tplFn, o) {
		o.dataResourceUrl="/res";

		let tpl=String(fs.readFileSync(this.getContentDir()+"/"+tplFn));
		tal.process(tpl,o).then((c)=>{
			res.end(c);
		});
	}

	getContentDir() {
		let moduleUrl=new URL(import.meta.url);
		let dirName=path.dirname(moduleUrl.pathname);
		let contentDir=dirName+"/../../../spec/mock/";

		return contentDir;
	}

	appendUrl(u, key, value) {
		let ur=new URL(u);
		ur.searchParams.set(key,value);

		return ur.toString();
	}

	handleRequest(req, res) {
		let content;
		let path=url.parse(req.url).pathname;
		let params=getReqParams(req);
		let u="ws://"+req.headers.host+"/";

		switch (path) {
			case "/mock":
				this.serve(res,"single.html",{
					dataMock: true,
					dataServerUrl: null,
					dataHowtoLink: null,
					dataAccountLink: null
				});
				break;

			case "/single":
				u=this.appendUrl(u,"gameId","table1");

				this.serve(res,"single.html",{
					dataMock: false,
					dataServerUrl: this.appendUrl(u,"token",params.token),
					dataHowtoLink: "https://www.howstuffworks.com/",
					dataAccountLink: "https://accounts.nintendo.com/"
				});
				break;

			case "/dual":
				u=this.appendUrl(u,"gameId","table1");

				this.serve(res,"dual.html",{
					dataServerUrls: [
						this.appendUrl(u,"token","user1"),
						this.appendUrl(u,"token","user2")
					]
				});
				break;

			case "/quadra":
				u=this.appendUrl(u,"gameId","table1");

				this.serve(res,"quadra.html",{
					dataMockReplies: false,
					dataServerUrls: [
						this.appendUrl(u,"token","user1"),
						this.appendUrl(u,"token","user2"),
						this.appendUrl(u,"token","user3"),
						this.appendUrl(u,"token","user4")
					]
				});
				break;

			case "/single-tournament":
				u=this.appendUrl(u,"gameId","tour1");

				this.serve(res,"single.html",{
					dataMock: false,
					dataServerUrl: this.appendUrl(u,"token",params.token),
					dataHowtoLink: null,
					dataAccountLink: null
				});
				break;

			case "/single-tournament2":
				u=this.appendUrl(u,"gameId","tour2");

				this.serve(res,"single.html",{
					dataMock: false,
					dataServerUrl: this.appendUrl(u,"token",params.token),
					dataHowtoLink: null,
					dataAccountLink: null
				});
				break;

			case "/quadra-tournament":
				u=this.appendUrl(u,"gameId","tour1");

				this.serve(res,"quadra.html",{
					dataMockReplies: false,
					dataServerUrls: [
						this.appendUrl(u,"token","user1"),
						this.appendUrl(u,"token","user2"),
						this.appendUrl(u,"token","user3"),
						this.appendUrl(u,"token","user4")
					]
				});
				break;

			case "/quadra-tournament-bots":
				u=this.appendUrl(u,"gameId","tour1");

				this.serve(res,"quadra.html",{
					dataMockReplies: true,
					dataServerUrls: [
						this.appendUrl(u,"token","user1"),
						this.appendUrl(u,"token","user2"),
						this.appendUrl(u,"token","user3"),
						this.appendUrl(u,"token","user4")
					]
				});
				break;

			case "/":
				res.end(fs.readFileSync(this.getContentDir()+"/index.html"));
				break;

			case "/res/tonopahclient.css":
			case "/res/tonopahclient.js":
			case "/res/sounds/attention.mp3":
			case "/res/sounds/card.mp3":
			case "/style.css":
				console.log("Serving static: "+req.url);
				res.end(fs.readFileSync(this.getContentDir()+req.url));
				break;

			default:
				return false;
		}

		return true;
	}
}