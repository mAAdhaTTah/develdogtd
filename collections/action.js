import Backbone from 'backbone';
import CollectionView from '../views/collection.action';
import actionChannel from '../channels/action';
import projectChannel from '../channels/project';

export default Backbone.Collection.extend({

  /**
   * Model associated with the collection
   */
  model: require('../models/action'),

  /**
   * API URL for the collection
   */
  url: '/api/v1/actions',

  /**
   * Adds the responses to the action channel
   */
  initialize: function() {
    actionChannel.reply('model:byId', this.get, this);
    actionChannel.reply('view:inbox', this.viewInbox, this);
    actionChannel.reply('view:byProject', this.viewByProject, this);
    actionChannel.reply('view:byContext', this.viewByContext, this);

    actionChannel.comply('add', this.addAction, this);
  },

  /**
   * Retrieves a CollectionView for the inbox
   *
   * @returns {CollectionView}
   */
  viewInbox: function() {
    // @todo filter by project + context
    return this.newView();
  },

  /**
   * Retrieves a CollectionView for a given project
   *
   * @param model
   * @returns {CollectionView}
   */
  viewByProject: function(model) {
    let view = this.newView();

    view.filter = function(child, index, collection) {
      if (child.get('completed')) {
        return false;
      }

      if (model) {
        return child.get('project_id') === model.id;
      }

      return child.get('project_id') === null;
    };

    return view;
  },

  /**
   * Retrieves a CollectionView for a given context
   *
   * @param model
   * @returns {CollectionView}
   */
  viewByContext: function(model) {
    let view = this.newView();

    view.filter = function(child, index, collection) {
      if (child.get('completed')) {
        return false;
      }

      if (model) {
        return child.get('context_id') === model.id;
      }

      return child.get('context_id') === null;
    };

    return view;
  },

  /**
   * Create a new view with this collection already included
   *
   * @returns {CollectionView}
   */
  newView: function() {
    return new CollectionView({
      collection: this
    });
  },

  /**
   * Creates a new action based on the current app state
   * and adds it to the collection
   */
  addAction: function() {
    let action = {};
    let routeParts = Backbone.history.getFragment().split('/');

    // if the route hash has a base + an id
    // there we're going to parse the base
    // to figure out which type and id to
    // add the action to
    //
    // @todo this seems... not great; got a better idea?
    // we're assuming all our routes are pural/end in 's'
    // controller or app state?
    if (routeParts.length > 1) {
      let [base, id] = routeParts;

      action[base.slice(0, -1) + '_id'] = parseInt(id);

      if (action.project_id) {
        let context_id;
        let project = projectChannel.request('model:byId', action.project_id);

        if (context_id = project.get('context_id')) {
          action.context_id = context_id;
        }
      }
    }

    this.add(action);
  }
});
