const packageInfo = require('../../package.json');
const name = packageInfo.name;

const daemon = require('../modules/daemon.js');

exports.command = 'server <command>';
exports.aliases = ['daemon'];
exports.describe = 'Control the Server Daemon.';

exports.builder = function (yargs) {
	yargs.positional('command',{
		choices:['start','stop','restart','status']
	}).option('port',{
		describe:'port to run on',
		type:'number',
		default: 3040
	}).option('mongoUrl',{
		alias: 'murl',
		describe: 'mongodb url to connect to',
		default: 'mongodb://127.0.0.1:27017/'
	}).option('mongoOptions',{
		alias: 'mopts',
		describe: 'options to pass to mongodb.connect',
		default: '{"family":4}',
		coerce: JSON.parse
	}).option('database',{
		alias: 'db',
		describe: 'the name of the database to use',
		default: name
	}).option('debug',{
		type: 'boolean',
		default: false
	})
}

exports.handler = async function (argv) {
	switch(argv.command){
		case 'start':
			await daemon.start(argv)
			break
		case 'stop':
			await daemon.stop(argv)
			break
		case 'restart':
			await daemon.restart(argv)
			break
		case 'status':
			await daemon.status(argv)
			break
	}
}
