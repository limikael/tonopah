#!/usr/bin/env node

import minimist from "minimist";
import fs from "fs";
import TonopahServer from "./src/server/app/TonopahServer.mjs";

function usage() {
	console.log("Usage: tonopahserver <options>");
	console.log("");
	console.log("Minimum required options to start are port and one of backend or mock.");
	console.log("");
	console.log("Options:");
	console.log("");
	console.log("  --port <port>         Port where to listen.");
	console.log("  --backend <url>       Backend url.");
	console.log("  --wp-backend <url>    WordPress Backend url.");
	console.log("  --mock                Use mocked backend.");
	console.log("  --key                 Backend key.");
	//console.log("  --config <filename>   Load config from file.");
	console.log("");

	process.exit(1);
}

let args={};
if (process.env.TONOPAH_PORT)
	args.port=process.env.TONOPAH_PORT;

if (process.env.PORT)
	args.port=process.env.PORT;

if (process.env.TONOPAH_KEY)
	args.key=process.env.TONOPAH_KEY;

if (process.env.TONOPAH_WP_BACKEND)
	args["wp-backend"]=process.env.TONOPAH_WP_BACKEND;

args={...args,...minimist(process.argv.slice(2))};
if (args.config)
	args={...args,...JSON.parse(fs.readFileSync(args.config))};

let server=new TonopahServer(args);

if (server.getSettingsError()) {
	console.log(server.getSettingsError());
	console.log();
	usage();
}

server.run();