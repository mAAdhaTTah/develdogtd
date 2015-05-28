module.exports = Marionette.Behavior.extend({

  /**
   * Events hash for this behavior
   */
  events: {
    'keyup @ui.name': 'updateName'
  },

  /**
   * Updates the name attribute on the model from the field
   */
  updateName: function() {
    this.view.saveModel('name', this.ui.name.val());
  }
});
