var moment = require('moment');
var time = require('../config').time;

module.exports = Marionette.Behavior.extend({

  /**
   * Model event bindings
   */
  modelEvents: {
    'change:due': 'toggleClass',
    'change:completed': 'toggleClass'
  },

  /**
   * Renders the datetimepicker for the item due date
   */
  onRender: function() {
    var due;

    this.ui.due.datetimepicker({
      onChangeDateTime: _.bind(this.updateDue, this)
    });

    if (due = this.view.model.get('due')) {
      this.ui.due.val(moment(due).format(time.client));
    }

    this.toggleClass(this.incompleteAndPastDue());
  },

  /**
   * Returns whether the model is currently incomplete and past due
   * Used to set the item's class
   * @returns {boolean}
   */
  incompleteAndPastDue: function () {
    return !this.view.model.get('completed') && moment(Date.now()).isAfter(this.view.model.get('due'));
  },

  /**
   * Adds .overdue to the view if it's past due and incomplete
   */
  toggleClass: function() {
    if (this.incompleteAndPastDue()) {
      this.$el.addClass('overdue');
    } else {
      this.$el.removeClass('overdue');
    }
  },

  /**
   * Update the model's due property when the element's value changes
   */
  updateDue: function() {
    this.toggleClass();
    this.view.saveModel('due', moment(this.ui.due.val(), time.client).format());
  }
});
