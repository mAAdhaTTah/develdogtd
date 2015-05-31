var validation = require('../validation').context;

var bookshelf = require('../../db/bookshelf');
var User = require('../user/server');
var Task = require('../task');

module.exports = bookshelf.model('Context', {
  tableName: 'contexts',
  hasTimestamps: true,
  hidden: ['user_id'],
  defaults: {
    name: ''
  },

  initialize: function() {
    // this.on('saving', this.validateSave);
  },

  validateSave: function() {
    return validation.run(this.attributes);
  },

  user: function() {
    return this.belongsTo('User');
  },

  task: function() {
    return this.hasMany('Task');
  }
});
