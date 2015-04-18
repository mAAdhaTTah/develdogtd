var CollectionView = require('../views/collection.action');
var actionChannel = require('../channels/action');

module.exports = Backbone.Collection.extend({
  model: require('../models/action'),
  url: '/api/v1/actions',

  initialize: function() {
    actionChannel.reply('model:byId', this.get, this);
    actionChannel.reply('view:inbox', this.viewInbox, this);
    actionChannel.reply('view:byProject', this.viewByProject, this);

    actionChannel.comply('add', this.addAction, this);
  },

  viewInbox: function() {
    // @todo filter by project + context
    return this.newView();
  },

  viewByProject: function(model) {
    var view = this.newView();

    view.filter = function(child, index, collection) {
      return !child.get('completed') && child.get('project_id') === model.id;
    };

    return view;
  },

  newView: function() {
    return new CollectionView({
      collection: this
    });
  },

  addAction: function() {
    var action = {};
    var routeParts = Backbone.history.getFragment().split('/');

    // if the route hash has a base + an id
    // there we're going to parse the base
    // to figure out which type and id to
    // add the action to
    //
    // @todo this seems... not great; got a better idea?
    // we're assuming all our routes are pural/end in 's'
    // controller or app state state?
    if (routeParts.length > 1) {
      var base = routeParts[0];
      var id = routeParts[1];

      action[base.slice(0, -1) + '_id'] = parseInt(id);
    }

    this.add(action);
  }
});
