var db = require('../db');
var Promise = require('bluebird');

var Users = module.exports

Users.byType = function (type) {
  return db('categories').where({ type: type }).limit(1)
    .then(function (rows) {
      return rows[0]
    })
}

Users.create = function (incomingAttrs) {
	
	var attrs = Object.assign({}, incomingAttrs)
	
	console.log('create attrs:', attrs)
  return db('posts').insert(attrs)
    .then(function (result) {
      // Prepare new user for outside world
      return result[0];
    });
};


