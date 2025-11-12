// Configure, and link everything together so we have access everywhere
// Each Component has Access to Each Other through the 'apps' map being passed to them.
// Components Add Public Functions/Objects to the Map as they are Configured

(async () => {

	const apps = new Map();

	// A Place to Store Random Data
	apps.set('datashare', {});

	// Database Component
	apps.set('database', await require('./database/client.js')(apps));

	// Express Server Component
	apps.set('server', await require('./server/server.js')(apps));

})();
