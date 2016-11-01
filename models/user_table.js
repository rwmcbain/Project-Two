var Bookshelf = require('./db'); 
// var bookshelf = require('bookshelf')(db);
// var bcrypt = require('bcryptjs');

require('./journal_table');

var User = Bookshelf.Model.extend({
	tableName: 'users',
	journals: function() {
		return this.hasMany('Journal');
	}

});


module.exports = Bookshelf.model('User', User);