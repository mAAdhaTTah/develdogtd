import { Behavior } from 'backbone.marionette';
import jQuery from 'jquery';
import _ from 'lodash';
import moment from 'moment';
import config from '../config';

export default Behavior.extend({

  /**
   * Model event bindings
   */
  modelEvents: {
    'change:due': 'toggleClass',
    'change:completed': 'toggleClass'
  },

  events: {
    '@ui.due change': 'updateDue'
  },

  /**
   * Renders the datetimepicker for the item due date
   */
  onRender: function() {
    let due;

    if (due = this.view.model.get('due')) {
      this.ui.due.val(moment(due).format(config.time.client));
    }

    this.toggleClass();
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
