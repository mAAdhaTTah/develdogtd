var validation = require('../validation').context;

module.exports = Backbone.Model.extend({
  defaults: {
    name: ''
  },

  validate: function(atts, opts) {
    var result = validation.validateSync(atts);
    if (result[0]) {
      return result[0].toJSON();
    }
  }
});
