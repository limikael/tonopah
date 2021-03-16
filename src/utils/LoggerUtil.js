export function installToConsole(logger) {
	console.log=(message)=>logger.log("debug",message);
	console.debug=(message)=>logger.log("debug",message);
	console.info=(message)=>logger.log("info",message);
	console.warn=(message)=>logger.log("warn",message);
	console.error=(message)=>logger.log("error",message);
}

export default {
	installToConsole
};