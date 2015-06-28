import Backbone from 'backbone';
import validation from './validation';

export default Backbone.Model.extend({
  defaults: {
    name: '',
    type: 'action',
    completed: false,
    project_id: null,
    context_id: null
  },

  validate: function (atts, opts) {
    let result = validation.task.validateSync(atts);

    if(result[0]) {
      return result[0].toJSON();
    }
  }
});
