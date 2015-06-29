import { CompositeView, RegionManager } from 'backbone.marionette';
import actionChannel from '../channels/action';
import contextChannel from '../channels/context';

export default CompositeView.extend({
  childView: require('./item.list.context'),
  childViewContainer: '.contexts',
  template: require('../templates/collection.context.hbs'),
  className: 'perspective-contexts',
  childEvents: {
    'actions:show': 'showContextActions'
  },

  onRender: function() {
    this.regions = new RegionManager({
      regions: {
        actions: '.current-context .actions'
      }
    });
  },

  setActive: function(id) {
    let model = contextChannel.request('model:byId', id);
    let actionsView = actionChannel.request('view:byContext', model);

    this.children.findByModel(model).makeActive();

    this.regions.get('actions').show(actionsView);
  },

  showUnassigned: function() {
    let actionsView = actionChannel.request('view:byContext');

    this.regions.get('actions').show(actionsView);
  }
});
