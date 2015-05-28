module.exports = Marionette.Behavior.extend({

  /**
   * Events hash for this behavior
   */
  events: {
    'click @ui.completed': 'updateCompleted'
  },

  /**
   * Sets the proper completed class for the item
   */
  onRender: function() {
    var completed = this.view.model.get('completed');

    this.ui.completed.prop('checked', completed);

    this.toggleClass(completed);
  },

  /**
   * Toggle the completed class on the behavior's view
   * @param completed
   */
  toggleClass: function(completed) {
    if (completed) {
      this.$el.addClass('completed');
    } else {
      this.$el.removeClass('completed');
    }
  },

  /**
   * Updates the model with the completed status from the field
   */
  updateCompleted: function() {
    var completed = this.ui.completed.is(':checked');

    this.toggleClass(completed);
    this.view.saveModel('completed', completed);
  }
});
