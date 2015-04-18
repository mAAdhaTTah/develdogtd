var CollectionView = require('../views/collection.project');
var projectChannel = require('../channels/project');

module.exports = Backbone.Collection.extend({
  model: require('../models/project'),
  url: '/api/v1/projects',

  initialize: function() {
    projectChannel.reply('list', this.listProjects, this);
    projectChannel.reply('view:projects', this.getView, this);
    projectChannel.reply('model:byId', this.modelById, this);
    projectChannel.comply('add', this.addProject, this);
  },

  listProjects: function() {
    return this.toJSON();
  },

  getView: function(id) {
    var view = new CollectionView({ collection: this });

    if (id) {
      view.setActive(id);
    }

    return view;
  },

  modelById: function(id) {
    return this.get(id);
  },

  addProject: function(project) {
    return project ? this.add(project) : this.add({});
  }
});
