var db = require('./db'); 
var bookshelf = require('bookshelf')(db);
var JournalEntry = bookshelf.Model.extend({
	tableName: 'journal_entry'
});


module.exports = JournalEntry;