import Marionette from 'backbone.marionette';
import io from 'socket.io-client';
import AppView from './view';
import ActionCollection from '../collections/action';
import ProjectCollection from '../collections/project';
import ContextCollection from '../collections/context';
import UserModel from '../models/user';
import actionChannel from '../channels/action';
import projectChannel from '../channels/project';
import contextChannel from '../channels/context';

export default Marionette.Object.extend({

  initialize: function() {
    this.view = new AppView();

    this.actionCollection = new ActionCollection(window.ddBoot.actions);
    this.projectCollection = new ProjectCollection(window.ddBoot.projects);
    this.contextsCollection  = new ContextCollection(window.ddBoot.contexts);
    this.userModel = new UserModel(window.ddBoot.user);

  },

  inbox: function() {
    this.view.setActive('inbox');

    this.view.main.show(actionChannel.request('view:inbox'));
  },

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
