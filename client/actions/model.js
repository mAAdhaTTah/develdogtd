import { Model } from 'backbone';
import validation from '../../validation';

export default Model.extend({

  /**
   * Default model attributes for an action
   */
  defaults: {
    name: '',
    type: 'action',
    completed: false,
    project_id: null,
    context_id: null
  },

  /**
   * Validates the model's attributes
   *
   * @param atts
   * @returns {*}
   */
  validate: function (atts) {
    let result = validation.task.validateSync(atts);

    if(result[0]) {
      return result[0].toJSON();
    }
  }
});
