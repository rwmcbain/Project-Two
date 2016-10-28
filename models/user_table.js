var db = require('./db'); 
var bookshelf = require('bookshelf')(db);
var bcrypt = require('bcryptjs');

var UserAccount = bookshelf.Model.extend({
	tableName: 'user_accounts'
});


module.exports = UserAccount;