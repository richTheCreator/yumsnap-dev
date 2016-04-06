//var browserify = require('browserify-middleware')
var express = require('express')
var webpack = require ('webpack');
var webpackDevMiddleware = require ('webpack-dev-middleware')  
var webpackHotMiddleware = require ('webpack-hot-middleware')  
var config = require( './../webpack.config.js')
var compiler = webpack(config)  

var Path = require('path')
var sess = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')


var passport = require('passport')

var Posts = require('./../client/models/posts');
var Users = require('./../client/models/users');

var routes = express.Router()
var app = express()


app.use(webpackDevMiddleware(compiler, {  
    publicPath: config.output.publicPath,  
    stats: {colors: true}  
}))

app.use(webpackHotMiddleware(compiler, {  
    log: console.log 
})) 
// Parse incoming request bodies as JSON
app.use(bodyParser.json())
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(sess({
//	secret: 'secret',
//	resave: false,
//	saveUninitialized: false
//}))

//app.use(passport.initialize())
//app.use(passport.session())
//passport.use(new passportLocal.strategy(function(usr,pass,done){
//	if()
//	done(null,user)
//}))

// Mount our main router
app.use('/', routes)
//
// Provide a browserified file at a specified path
//
//routes.get('/app-bundle.js',
//  browserify('./../client/app.js'))

routes.get('/', function (req, res) {
	res.sendFile(assetFolder + '/index.html')
})

// Static assets (html, etc.)

var assetFolder = Path.resolve(__dirname, '../dist')
routes.use(express.static(assetFolder))

routes.get('/auth/facebook', passport.authenticate('facebook'));

routes.get('/auth/facebook/callback',
	passport.authenticate('facebook', {
		successRedirect: '/',
		failureRedirect: '/login'
	}));


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

routes.post('/signup', function(req, res) {
	var user = req.body;
	
	Users.create(user)
	.then(function(person){
		res.status(201).send(person);
	})
	.catch(function (err) {
	console.log('Error creating new user: ', err);
	return res.status(404).send(err);
	})
})


routes.post('/login', function (req, res) {
	var user = req.body.username;
	var pass = req.body.password;

	Users.verify(user, pass).then(function (person) {
		if (person){
			res.status(201).send(person);
		}
		else {
			res.status(400);
			res.end('not a user')
		}
	})
})





var port = process.env.PORT || 4000
app.listen(port)
console.log("Listening on port", port)
