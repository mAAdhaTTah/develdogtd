var HeaderView = require('./item.header.project');
var actionChannel = require('../channels/action');

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
        'actions': '.current-project .actions',
        'header': '.current-project .header'
      }
    });
  },

  showProjectActions: function(projectView) {
    var projectHeader = new HeaderView({ model: projectView.model });
    var actionsView = actionChannel.request('view:byProject', projectView.model);

    if(this.$active) {
      this.$active.makeInactive();
    }

    this.$active = projectView.makeActive();

    this.regions.get('header').show(projectHeader);
    this.regions.get('actions').show(actionsView);
  }
});
