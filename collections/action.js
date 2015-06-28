import Backbone from 'backbone';
import CollectionView from '../views/collection.action';
import actionChannel from '../channels/action';
import projectChannel from '../channels/project';

export default Backbone.Collection.extend({
  model: require('../models/action'),
  url: '/api/v1/actions',

  initialize: function() {
    actionChannel.reply('model:byId', this.get, this);
    actionChannel.reply('view:inbox', this.viewInbox, this);
    actionChannel.reply('view:byProject', this.viewByProject, this);
    actionChannel.reply('view:byContext', this.viewByContext, this);

    actionChannel.comply('add', this.addAction, this);
  },

  viewInbox: function() {
    // @todo filter by project + context
    return this.newView();
  },

  viewByProject: function(model) {
    var view = this.newView();

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

  viewByContext: function(model) {
    var view = this.newView();

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
    var action = {};
    var routeParts = Backbone.history.getFragment().split('/');

    // if the route hash has a base + an id
    // there we're going to parse the base
    // to figure out which type and id to
    // add the action to
    //
    // @todo this seems... not great; got a better idea?
    // we're assuming all our routes are pural/end in 's'
    // controller or app state?
    if (routeParts.length > 1) {
      var base = routeParts[0];
      var id = routeParts[1];

      action[base.slice(0, -1) + '_id'] = parseInt(id);

      if (action.project_id) {
        var context_id;
        var project = projectChannel.request('model:byId', action.project_id);

        if (context_id = project.get('context_id')) {
          action.context_id = context_id;
        }
      }
    }

    this.add(action);
  }
});
