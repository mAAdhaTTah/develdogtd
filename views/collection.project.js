var HeaderView = require('./item.header.project');
var actionChannel = require('../channels/action');
var projectChannel = require('../channels/project');

module.exports = Marionette.CompositeView.extend({
  childView: require('./item.list.project'),
  childViewContainer: '.projects',
  template: require('../templates/collection.project.hbs'),
  className: 'perspective-projects',
  childEvents: {
    'actions:show': 'showProjectActions'
  },

  onRender: function() {
    this.regions = new Marionette.RegionManager({
      regions: {
        actions: '.current-project .actions',
        header: '.current-project .header'
      }
    });
  },

  setActive: function(id) {
    var model = projectChannel.request('model:byId', id);
    var projectHeader = new HeaderView({ model: model });
    var actionsView = actionChannel.request('view:byProject', model);

    this.children.findByModel(model).makeActive();

    this.regions.get('header').show(projectHeader);
    this.regions.get('actions').show(actionsView);
  }
});
