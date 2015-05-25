var validation = require('./validation').context;
var defaults = {
  name: ''
};

// @todo this may not be fun and reusable cuz we bring in a bunch of extra shit with browserify

if (typeof window === 'undefined') {
  var bookshelf = require('../common/bookshelf');
  var User = require('./user');
  var Task = require('./task');

  module.exports = bookshelf.model('Context', {
    tableName: 'contexts',
    hasTimestamps: true,
    hidden: ['user_id'],
    defaults: defaults,

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

} else {
  module.exports = Backbone.Model.extend({
    defaults: defaults,

    validate: function (atts, opts) {
      var result = validation.validateSync(atts);
      if(result[0]) {
        return result[0].toJSON();
      }
    }
  });
}
