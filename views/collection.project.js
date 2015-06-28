import { CompositeView, RegionManager } from 'backbone.marionette';
import HeaderView from './item.header.project';
import actionChannel from '../channels/action';
import projectChannel from '../channels/project';

export default CompositeView.extend({
  childView: require('./item.list.project'),
  childViewContainer: '.projects',
  template: require('../templates/collection.project.hbs'),
  className: 'perspective-projects',
  childEvents: {
    'actions:show': 'showProjectActions'
  },

  onRender: function() {
    this.regions = new RegionManager({
      regions: {
        actions: '.current-project .actions',
        header: '.current-project .header'
      }
    });
  },

  setActive: function(id) {
    let model = projectChannel.request('model:byId', id);
    let projectHeader = new HeaderView({ model: model });
    let actionsView = actionChannel.request('view:byProject', model);

    this.children.findByModel(model).makeActive();

    this.regions.get('header').show(projectHeader);
    this.regions.get('actions').show(actionsView);
  },

  showUnassigned: function() {
    let actionsView = actionChannel.request('view:byProject');
    this.regions.get('actions').show(actionsView);
  }
});
