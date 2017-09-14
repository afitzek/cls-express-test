var cls = require('continuation-local-storage')


module.exports = function (message) {
	var ns = cls.getNamespace('resin-api')
	var testID = ns.get('testID')

	console.log("[" + testID + "]: " + message);
}