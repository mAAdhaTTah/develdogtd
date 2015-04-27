var CollectionView = require('../views/collection.project');
var projectChannel = require('../channels/project');

module.exports = Backbone.Collection.extend({
  model: require('../models/project'),
  url: '/api/v1/projects',

  initialize: function() {
    projectChannel.reply('list', this.listProjects, this);
    projectChannel.reply('view:projects', this.getView, this);
    projectChannel.reply('model:byId', this.get, this);
    projectChannel.comply('add', this.addProject, this);

    this.on('add', function(project) {
      projectChannel.trigger('added', project);
    });
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

  addProject: function(project) {
    if(project) {
      this.add(project);
    } else {
      this.add({});
    }
  }
});
