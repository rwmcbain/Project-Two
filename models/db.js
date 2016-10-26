require('dotenv').config(); //# dot-env
var db = require('knex')({	//# knex
	client: 'mysql',
	connection: {
		host: 'localhost',
		user: 'ru55ell',
		password: 'pooty',
		database: 'cats_fansite'
	}
});

module.exports = db;