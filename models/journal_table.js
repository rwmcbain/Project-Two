var Bookshelf = require('./db'); 
// var bookshelf = require('bookshelf')(db);
require('./user_table');

var Journal = Bookshelf.Model.extend({
	tableName: 'journal_entrys',
	user: function() {
    	return this.belongsTo('User');
  	}
});


module.exports = Bookshelf.model('Journal', Journal);