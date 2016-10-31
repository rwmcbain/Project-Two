var db = require('./db'); 
var bookshelf = require('bookshelf')(db);
var bcrypt = require('bcryptjs');

var JournalTable = require('./journal_table');

var UserAccount = bookshelf.Model.extend({
	tableName: 'user_accounts',

	// journals: function() {
	// 	return this.hasMany(JournalTable);
	// }

});


module.exports = UserAccount;