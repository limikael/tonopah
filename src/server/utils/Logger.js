import SimpleLogger from "simple-node-logger";
import path from "path";
import fs from "fs";

export default class Logger {
	constructor(fn) {
		this.simpleLogger=new SimpleLogger();
		this.simpleLogger.createConsoleAppender();

		if (fn) {
			let file=path.normalize(fn);
			const opts={
				flags:'a',
				encoding:'utf8'
			};

			this.logWriter=fs.createWriteStream(file,opts);
			this.simpleLogger.createFileAppender({
				writer: this.logWriter,
				logFilePath: "_dummy_not_used_"
			});
		};

		this.logger=this.simpleLogger.createLogger();
		this.logger.setLevel("debug");
	}

	install() {
		console.log=(message)=>this.logger.log("debug",message);
		console.debug=(message)=>this.logger.log("debug",message);
		console.info=(message)=>this.logger.log("info",message);
		console.warn=(message)=>this.logger.log("warn",message);
		console.error=(message)=>this.logger.log("error",message);
	}

	flush() {
		return new Promise((resolve)=>{
			process.nextTick(()=>{
				if (this.logWriter) {
					this.logWriter.write("\n");
					this.logWriter.end(()=>{
						resolve();
					});
				}

				else
					resolve();
			});
		})
	}
}