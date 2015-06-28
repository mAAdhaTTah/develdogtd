import { ItemView } from 'backbone.marionette';
import projectChannel from '../channels/project';

export default ItemView.extend({
  tagName: 'li',
  template: require('../templates/list.project.hbs'),

  makeActive: function() {
    this.$el.addClass('active');

    return this;
  }
});
