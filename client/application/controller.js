import Marionette from 'backbone.marionette';
import io from 'socket.io-client';
import _ from 'lodash';
import AppView from './view';
import ActionCollection from '../actions/collection';
import ProjectCollection from '../collections/project';
import ContextCollection from '../collections/context';
import UserModel from '../models/user';
import actionChannel from '../channels/action';
import projectChannel from '../channels/project';
import contextChannel from '../channels/context';

export default Marionette.Object.extend({

  /**
   * Initialize the socket and collections
   */
  initialize: function() {
    this.view = new AppView();

    let socket = io();
    let dataStore = {
      projects: new ProjectCollection(),
      contexts: new ContextCollection(),
      actions: new ActionCollection(),
      user: new UserModel()
    };

    socket.on('connect', function() {
      socket.emit('all:reconcile');
    });

    socket.on('connect_error', function() {
      // @todo send error
    });

    socket.on('all:reconciled', function(data) {
      _.forOwn(data, function(val, key) {
        if (dataStore[key]) {
          dataStore[key].set(val);
        }
      });
    });
  },

  /**
   * Displays in the inbox view
   */
  inbox: function() {
    this.view.setActive('inbox');

    this.view.main.show(actionChannel.request('view:inbox'));
  },

  /**
   * Displays the project view for a given project
   *
   * @param project_id
   */
  projects: function(project_id) {
    this.view.setActive('projects');

    let view = projectChannel.request('view:projects');

    this.view.main.show(view);

    if (project_id) {
      view.setActive(project_id);
    } else {
      view.showUnassigned();
    }
  },

  /**
   * Displays the context view for a given context
   *
   * @param context_id
   */
  contexts: function(context_id) {
    this.view.setActive('contexts');

    let view = contextChannel.request('view:contexts');

    this.view.main.show(view);

    if (context_id) {
      view.setActive(context_id);
    } else {
      view.showUnassigned();
    }
  }
});
