import { LayoutView } from 'backbone.marionette';
import globalChannel from '../channels/global';
import actionChannel from '../channels/action';
import projectChannel from '../channels/project';

export default LayoutView.extend({

  /**
   * Grabs this page element
   */
  el: '.app',

  /**
   * Uses already rendered html
   */
  template: false,

  /**
   * Defines regions on the page
   */
  regions: {
    main: '.main'
  },

  /**
   * UI hash
   */
  ui: {
    'addAction': '#add-action',
    'refresh': '#refresh'
  },

  /**
   * Events bindings
   */
  events: {
    'click @ui.addAction': 'addAction',
    'click @ui.refresh': 'refresh'
  },

  /**
   * Adds a new action on click
   */
  addAction: function() {
    actionChannel.command('add');
  },

  /**
   * Refreshes the currently shown actions on click
   */
  refresh: function() {
    globalChannel.command('refresh');
  },

  /**
   * Sets the currently action perspective
   * @param perspective
   */
  setActive: function(perspective) {
    if (this.$active) {
      this.$active.removeClass('active');
    }

    this.$active = this.$('#' + perspective).addClass('active');
  }
});
