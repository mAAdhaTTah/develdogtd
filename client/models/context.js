import Backbone from 'backbone';
import validation from '../../validation';

module.exports = Backbone.Model.extend({
  defaults: {
    name: ''
  },

  validate: function(atts) {
    let result = validation.context.validateSync(atts);

    if (result[0]) {
      return result[0].toJSON();
    }
  }
});
