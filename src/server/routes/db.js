var router = require('express').Router();

// db route

router.get('/:collection/:oid', async function(req, res, next) {
	res.send("Under Construction");
});


module.exports = {
    path: '/db',
    handler: router
}
