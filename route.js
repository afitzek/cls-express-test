var cls = require('continuation-local-storage')
var Promise = require('bluebird')
var logger = require('./logger')

function test() {
	return new Promise(function (resolve, reject) {
		var ns = cls.getNamespace('resin-api')
		resolve(ns.get('testID'))
	});
}

module.exports = function (req, res, next) {
	var ns = cls.getNamespace('resin-api')
	var directValue = ns.get('testID');
	console.error("Direct value : " + directValue);

	test()
	.then(function(fromPromise) {
		console.error("promise value: " + fromPromise);
	})

	logger("Test message for request " + directValue);

	next();
};