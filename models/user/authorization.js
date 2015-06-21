var bookshelf = require('../../db/bookshelf');
var User = require('./server');

module.exports = bookshelf.model('Authorization', {

  /**
   * Define Authorization table
   */
  tableName: 'authorizations',

  /**
   * Hide properties from client
   */
  hidden: [''],

  /**
   * Authorization has timestamps
   */
  hasTimestamps: true,

  /**
   *
   */
  user: function() {
    return this.belongsTo('User');
  }
});
