var CollectionView = require('../views/collection.action');
var actionChannel = require('../channels/action');

module.exports = Backbone.Collection.extend({
  model: require('../models/action'),
  url: '/api/v1/actions',

  initialize: function() {
    actionChannel.reply('model:byId', this.modelById, this);
    actionChannel.reply('view:inbox', this.viewInbox, this);
    actionChannel.reply('view:byProject', this.viewByProject, this);

    actionChannel.comply('add', this.addAction, this);
  },

  modelById: function(id) {
    return this.findWhere({ id: id });
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

  addAction: function(action) {
    return action ? this.add(action) : this.add({});
  }
});
