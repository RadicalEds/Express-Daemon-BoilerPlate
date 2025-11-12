const packageInfo = require('../../package.json');
const name = packageInfo.name;

const dotenv = require('dotenv');
const fs = require('fs');

const cdir = `${process.env.HOME}/.config/${name}`;
process.env.BP_SERVER_PORT = process.env.BP_SERVER_PORT || 3040;
process.env.BP_MONGO_URL = process.env.BP_MONGO_URL || 'mongodb://127.0.0.1:27017';
process.env.BP_MONGO_OPTS = process.env.BP_MONGO_OPTS || '{"family":4}';
process.env.BP_MONGO_DB = process.env.BP_MONGO_DB || 'BP';
process.env.BP_CDIR = process.env.BP_CDIR || cdir;

module.exports = async(cfile=`${cdir}/config`) => {
	// create our main directory
	if (!fs.existsSync(cdir)) {
		fs.mkdirSync(cdir)
	}

	// load default configuration
		// load cfile into environment
	if (fs.existsSync(cfile)) {
		dotenv.config({ path: cfile });
	} else if (cfile !== `${cdir}/config`) {
		// if custom and does not exist
		throw new Error(`${cfile} does not exist.`)
	}
}
