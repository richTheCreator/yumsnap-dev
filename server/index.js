var browserify = require('browserify-middleware')
var express = require('express')
var Path = require('path')
//var sess = require('express-session');
//var cookieParser = require('cookie-parser');


var db  = require('../app/db');
var Posts = require('./../app/models/posts');
var Users = require('./../app/models/users');


var routes = express.Router()
var app = express()

// Parse incoming request bodies as JSON
app.use(require('body-parser').json())

// Mount our main router
app.use('/', routes)
//
// Provide a browserified file at a specified path
//
routes.get('/app-bundle.js',
  browserify('./client/app.js'))

//
// Example endpoint (also tested in test/server/index_test.js)
//
routes.get('/api/tags-example', function(req, res) {
  res.send(['node', 'express', 'browserify', 'mithril'])
})

//main endpoint for user posts
routes.post('/feed', function(req, res) {
	var card = req.body;
	console.log(req.body);
	Posts.create(card)
	.then(function(post){
		res.status(201).send(post);
	})
	.catch(function (err) {
				console.log('Error creating new post: ', err);
				return res.status(404).send(err);
			})
})


// endpoint thats only used to update categories table
routes.post('/categories', function(req, res) {
	var cats = req.body;

	Users.categories(cats)
	.then(function(cat){
		res.status(201).send(cats);
	})
	.catch(function (err) {
				console.log('Error creating new post: ', err);
				return res.status(404).send(err);
			})
})


routes.get('/*', function (req, res) {
	res.sendFile(assetFolder + '/index.html')
})

//
// Static assets (html, etc.)
//
var assetFolder = Path.resolve(__dirname, '../client/public')
routes.use(express.static(assetFolder))

var port = process.env.PORT || 4000
app.listen(port)
console.log("Listening on port", port)
//if (process.env.NODE_ENV !== 'test') {
//  //
//  // The Catch-all Route
//  // This is for supporting browser history pushstate.
//  // NOTE: Make sure this route is always LAST.
//  //
//
//
//  //
//  // We're in development or production mode;
//  // create and run a real server.
//  //
//  
//
//  // Start the server!
//  
//}
//else {
//  // We're in test mode; make this file importable instead.
//  module.exports = routes
//}
