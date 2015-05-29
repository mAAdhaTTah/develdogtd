var CollectionView = require('../views/collection.context');
var contextChannel = require('../channels/context');

module.exports = Backbone.Collection.extend({
  model: require('../models/context/client'),
  url: '/api/v1/contexts',

  initialize: function() {
    contextChannel.reply('list', this.listContexts, this);
    contextChannel.reply('view:contexts', this.getView, this);
    contextChannel.reply('model:byId', this.get, this);
    contextChannel.comply('add', this.addContext, this);

    this.on('add', function(context) {
      contextChannel.trigger('added', context);
    });
  },

  listContexts: function() {
    return this.toJSON();
  },

  getView: function(id) {
    var view = new CollectionView({ collection: this });

    if (id) {
      view.setActive(id);
    }

    return view;
  },

  addContext: function(context) {
    if(context) {
      this.add(context);
    } else {
      this.add({});
    }
  }
});
