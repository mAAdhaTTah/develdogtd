var validation = require('./validation').task;

module.exports = Backbone.Model.extend({
  defaults: {
    name: '',
    type: 'action',
    completed: false,
    project_id: null
    // context_id: null
  },

  validate: function (atts, opts) {
    var result = validation.validateSync(atts);
    if(result[0]) {
      return result[0].toJSON();
    }
  }
});
