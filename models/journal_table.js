var db = require('./db'); 
var bookshelf = require('bookshelf')(db);
var UserTable = require('./user_table');

var JournalEntry = bookshelf.Model.extend({
	tableName: 'journal_entry',

	// user: function() {
 //    return this.belongsTo(UserTable);
 //  }

});


module.exports = JournalEntry;