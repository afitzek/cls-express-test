var cls = require('continuation-local-storage')
var bcrypt = require('bcrypt')
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
	.then(function() {
		promiseValue = ns.get('testID');
		console.error("Promise value : " + promiseValue);
	})
	.then(function() {
		var ns = cls.getNamespace('resin-api')
	        var directValue = ns.get('testID');
		console.error("Promise 2 value : " + directValue);
	})
	.then(function() {
		return Promise.fromCallback(function(callback) {
			bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash('test', salt, function(err, hash) {
                        // Store hash in your password DB.
                        var ns = cls.getNamespace('resin-api')
                        var directValue = ns.get('testID');
                        console.error("Bcrypt value : " + directValue);
			callback();
                });
        });
		})
	})
	.then(function() {
		var ns = cls.getNamespace('resin-api')
                var directValue = ns.get('testID');
                console.error("Promise 3 value : " + directValue);
	})

	logger("Test message for request " + directValue);

	next();
};
