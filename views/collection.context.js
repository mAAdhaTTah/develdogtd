var actionChannel = require('../channels/action');
var contextChannel = require('../channels/context');

module.exports = Marionette.CompositeView.extend({
  childView: require('./item.list.context'),
  childViewContainer: '.contexts',
  template: require('../templates/collection.context.hbs'),
  className: 'perspective-contexts',
  childEvents: {
    'actions:show': 'showContextActions'
  },

  onRender: function() {
    this.regions = new Marionette.RegionManager({
      regions: {
        actions: '.current-context .actions'
      }
    });
  },

  setActive: function(id) {
    var model = contextChannel.request('model:byId', id);
    var actionsView = actionChannel.request('view:byContext', model);

    this.children.findByModel(model).makeActive();

    this.regions.get('actions').show(actionsView);
  }
});
