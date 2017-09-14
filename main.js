const express = require('express')
const cls = require('continuation-local-storage')
var middleware = require('./middleware.js')
var route = require('./route.js')
const app = express()

var ns = cls.createNamespace('resin-api')

app.use(function (req, res, next) {
  console.error("Running cls middleware!")
  ns.bindEmitter(req)
  ns.bindEmitter(res)

  return ns.run( function() { next(); })
})

app.use(middleware)

app.get('/', route)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})