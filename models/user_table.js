var db = require('./db'); 
var bookshelf = require('bookshelf')(db);
var UserAccount = bookshelf.Model.extend({
	tableName: 'user_accounts'
});


module.exports = UserAccount;