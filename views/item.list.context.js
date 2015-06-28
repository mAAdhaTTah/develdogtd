import { ItemView } from 'backbone.marionette';
import contextChannel from '../channels/context';

export default ItemView.extend({
  tagName: 'li',
  template: require('../templates/list.context.hbs'),

  makeActive: function() {
    this.$el.addClass('active');

    return this;
  }
});
