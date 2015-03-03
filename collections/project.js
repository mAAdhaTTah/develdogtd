var CollectionView = require('../views/collection.project');
var projectChannel = require('../channels/project');

module.exports = Backbone.Collection.extend({
  model: require('../models/project'),
  url: '/api/v1/projects',

  initialize: function() {
    projectChannel.comply('add', this.addProject, this);
    projectChannel.reply('list', this.listProjects, this);
    projectChannel.reply('view:projects', this.getProjects, this);
  },

  addProject: function(project) {
    return project ? this.add(project) : this.add({});
  },

  listProjects: function() {
    return this.toJSON();
  },

  getProjects: function() {
    return new CollectionView({ collection: this });
  }
});
