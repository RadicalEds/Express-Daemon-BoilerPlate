#!/usr/bin/env node
const packageInfo = require('../../package.json');
const scriptPath = "./src/bin/cli.js";
const name = Object.entries(packageInfo.bin).find(([k, v]) => v === scriptPath)?.[0];

(async () => {
	// configuration
	await require('../modules/configure.js');
	// commandline
	await require('yargs')(process.argv.slice(2))
		.scriptName(name)
		.usage('$0 <cmd> [args]')
		.commandDir('../yargs')
		.demandCommand()
		.help()
		.strict()
		.parse()
})();
