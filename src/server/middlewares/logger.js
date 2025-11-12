module.exports = function(req, res, next) {
	// log all requests
	console.log(`"REQUEST: ${new Date().toUTCString()}"| |"${req.ip}"| |"${req.method}"| |"${req.url}"| |"${req.get('User-Agent')}"`);
	next()
}
