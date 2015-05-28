module.exports = Marionette.Behavior.extend({

  /**
   * Events hash for this behavior
   */
  events: {
    'click @ui.delete': 'delete'
  },

  /**
   *
   */
  delete: function() {
    this.view.model.destroy({ wait: true });
  }
});
