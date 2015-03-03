var CollectionView = require('../views/collection.action');
var actionChannel = require('../channels/action');

module.exports = Backbone.Collection.extend({
  model: require('../models/action'),
  url: '/api/v1/actions',

  initialize: function() {
    actionChannel.comply('add', this.addAction, this);
    actionChannel.reply('view:inbox', this.getInbox, this);
    actionChannel.reply('view:byProject', this.getByProject, this);
  },

  addAction: function(action) {
    return action ? this.add(action) : this.add({});
  },

  getInbox: function() {
    // @todo filter by project + context
    return this.newView();
  },

  getByProject: function(model) {
    var view = this.newView();

    view.project_id = model.get('id');

    return view;
  },

  newView: function() {
    return new CollectionView({
      collection: this
    });
  }
});
