import Backbone from 'backbone';
import CollectionView from '../views/collection.project';
import projectChannel from '../channels/project';
import model from '../models/project';

export default Backbone.Collection.extend({

  /**
   * Default model for the collection
   */
  model,

  /**
   * Websocket namespace for the collection
   */
  url: 'projects',

  /**
   * Set up all the event listeners/bindings
   */
  initialize: function() {
    projectChannel.reply('list', this.listProjects, this);
    projectChannel.reply('view:projects', this.getView, this);
    projectChannel.reply('model:byId', this.get, this);
    projectChannel.reply('create', this.create, this);
    projectChannel.comply('add', this.addProject, this);

    this.on('add', function(project) {
      projectChannel.trigger('added', project);
    });
  },

  /**
   * Set up all the event listeners/bindings
   */
  listProjects: function() {
    return this.toJSON();
  },

  /**
   * Get view for the collection
   *
   * @param id
   * @returns {CollectionView}
   */
  getView: function(id) {
    let view = new CollectionView({ collection: this });

    if (id) {
      view.setActive(id);
    }

    return view;
  },

  /**
   * Add a new project to the collection
   * Adds a blank project if none is provided
   *
   * @param project
   */
  addProject: function(project) {
    if(project) {
      this.add(project);
    } else {
      this.add({});
    }
  }
});
