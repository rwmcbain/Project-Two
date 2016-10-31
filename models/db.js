require('dotenv').config(); //# dot-env
var db = require('knex')({	//# knex
	client: 'mysql',
	connection: {
		host: 'localhost',
		user: 'ru55ell',
		password: 'pooty',
		database: 'memory_data'
	}
});

module.exports = db;