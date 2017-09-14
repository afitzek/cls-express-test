var cls = require('continuation-local-storage');
var randomstring = require("randomstring");

module.exports = function (req, res, next) {
	console.error("Running test middleware")
	var ns = cls.getNamespace('resin-api')
	var newID = randomstring.generate();
	ns.set('testID', newID)
	console.error("Middleware value : " + newID);
	next();
};