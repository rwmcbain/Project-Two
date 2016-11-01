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

var Bookshelf = require('bookshelf')(db)

Bookshelf.plugin('registry')



module.exports = Bookshelf;