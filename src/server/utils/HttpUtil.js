import url from "url";

export function getReqParams(req) {
	let searchParams=new URLSearchParams(url.parse(req.url).query);
	return Object.fromEntries(searchParams);
}

export default {getReqParams};