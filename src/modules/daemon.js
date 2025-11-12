const packageInfo = require('../../package.json');
const name = packageInfo.name;

const fs = require('fs');
const { spawn } = require('node:child_process');
const debug = require('debug')(`${name}:daemon`);

const ourserver = async(argv) => {
	const serverprocess = spawn('node',['./index.js'],{
		cwd: `${__dirname}/../`,
		stdio: (argv.debug) ? 'pipe' : 'ignore',
		detached: (argv.debug) ? false : true,
	});
	if (argv.debug) {
		serverprocess.stdout.on('data',d => process.stdout.write(`${d}`))
		serverprocess.stderr.on('data',d => process.stderr.write(`${d}`))
	}
	return serverprocess.pid
}

/////////////////////////////////////////////////////////////////////////////////////
const pidfile = `/tmp/${name}.server.PID`;

module.exports.start = async function(argv){

	if (argv.debug) process.env.DEBUG = `${name}:*`

	if (fs.existsSync(pidfile)){
		console.log(`Server is already Running.`)
		process.exit(1)
	}

	// start server
	const pid = await ourserver(argv)
	console.log(`Starting Server ${pid} on Port ${process.env.BP_SERVER_PORT}`)

	// write pidfile
	if (!argv.debug) {
		fs.writeFileSync(pidfile,pid.toString())
		console.log(pid)
		setTimeout(async function(){
			try {
				process.kill(pid, 0) // check if running
				process.exit(0)
			} catch {
				fs.unlinkSync(pidfile);
				process.exit(1)
			}
		},2000);
	}
}

module.exports.stop = async function(argv){
	if (argv.debug) process.env.DEBUG = `${name}:*`
	// look for pidfile
	if (fs.existsSync(pidfile)) {
		const pid = fs.readFileSync(pidfile);
		console.log(`Stopping Server ${pid}`);
		process.kill(pid)
		fs.unlinkSync(pidfile);
	} else {
		console.log('server is not running.')
		process.exit(1);
	}
	// stop the running server
	// delete pidfile
}
module.exports.restart = async function(argv){
	if (argv.debug) process.env.DEBUG = `${name}:*`
	await module.exports.stop(argv);
	await module.exports.start(argv);
}
module.exports.status = async function(argv){
	if (argv.debug) process.env.DEBUG = `${name}:*`
	console.log('Under Construction')
	// check for pidfile
	// query running server
}
