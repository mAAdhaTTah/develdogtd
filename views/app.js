import { LayoutView } from 'backbone.marionette';
import globalChannel from '../channels/global';
import actionChannel from '../channels/action';
import projectChannel from '../channels/project';

export default LayoutView.extend({
  el: '.app',
  template: false,
  regions: {
    header: '.header',
    main: '.main'
  },

  initialize: function() {
    this.$nav = this.$('.navigation');
    this.$addAction = this.$('#add-action');
    this.$refresh = this.$('#refresh');

    this.$addAction.click(this.addAction);
    this.$refresh.click(this.refresh);

    globalChannel.comply('route', this.route, this);
  },

  addAction: function() {
    actionChannel.command('add');
  },

  refresh: function() {
    globalChannel.command('refresh');
  },

  setActive: function(perspective) {
    if (this.$active) {
      this.$active.removeClass('active');
    }

    this.$active = this.$nav.find('#' + perspective).addClass('active');
  }
});
