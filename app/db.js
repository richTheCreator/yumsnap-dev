var config      = require('../knexfile.js');  
var env         = 'development';  
var knex        = require('knex')(config[env]);

module.exports = knex;


console.log('in migration')
knex.migrate.latest([config]); 