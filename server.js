#!/usr/bin/env node

import minimist from "minimist";
import fs from "fs";
import TonopahServer from "./src/server/app/TonopahServer.mjs";

function usage() {
	console.log("Usage: tonopahserver <options>");
	console.log("");
	console.log("Minimum required options to start are port and one of backend or mock.");
	console.log("Options can also be read from env vars, like:");
	console.log("");
	console.log("  PORT=9999 ./server.js");
	console.log("");
	console.log("Options:");
	console.log("");
	console.log("  --port <port>         Port where to listen.");
	console.log("  --backend <url>       Backend url.");
	console.log("  --wp-backend <url>    WordPress Backend url.");
	console.log("  --mock                Use mocked backend.");
	console.log("  --key                 Backend key.");
	console.log("  --log                 Logging.");
	console.log("  --config <filename>   Load config from file.");
	console.log("  --bot-game-id <id>    Connect bots to this game.");
	console.log("");

	process.exit(1);
}

let args={};
let envArgMapping={
	PORT: "port",
	TONOPAH_PORT: "port",
	TONOPAH_KEY: "key",
	TONOPAH_CONFIG: "config",
	TONOPAH_BACKEND: "backend",
	TONOPAH_WP_BACKEND: "wp-backend",
	TONOPAH_LOG: "log"
};

for (let envVar in envArgMapping)
	if (process.env[envVar])
		args[envArgMapping[envVar]]=process.env[envVar];

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
