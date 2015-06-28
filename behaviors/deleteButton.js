import { Behavior } from 'backbone.marionette';

export default Behavior.extend({

  /**
   * Events hash for this behavior
   */
  events: {
    'click @ui.delete': 'deleteModel'
  },

  /**
   * Delete the model from the server
   */
  deleteModel: function() {
    this.view.model.destroy({ wait: true });
  }
});
