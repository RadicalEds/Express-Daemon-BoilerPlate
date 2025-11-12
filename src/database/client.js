const packageInfo = require('../../package.json');
const name = packageInfo.name;

const { MongoClient, ObjectId } = require('mongodb');
const debug = require('debug')(`${name}:database`);

module.exports = async (apps) => {
	const connection = await MongoClient.connect(process.env.BP_MONGO_URL, JSON.parse(process.env.BP_MONGO_OPTS));
	const db = await connection.db(process.env.BP_MONGO_DB);
	debug('connected');
	return {
		connection: connection,
		ObjectId: ObjectId,
		db: db,
	}
}
