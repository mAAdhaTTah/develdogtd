import Marionette from 'backbone.marionette';
import io from 'socket.io-client';
import AppView from './view';
import ActionCollection from '../actions/collection';
import ProjectCollection from '../collections/project';
import ContextCollection from '../collections/context';
import UserModel from '../models/user';
import actionChannel from '../channels/action';
import projectChannel from '../channels/project';
import contextChannel from '../channels/context';

export default Marionette.Object.extend({

  initialize: function() {
    this.view = new AppView();

    this.setUpSocket();
    this.setUpCollections();
  },

  /**
   * Establishes up the socket connection
   */
  setUpSocket: function() {
    let socket = io();

    socket.on('connect', function() {
      console.log('Connected');
    });

    socket.on('connect_error', function() {
      console.log('Failed');
    });
  },

  /**
   * Registers the collections & models used in the application
   */
  setUpCollections() {
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
