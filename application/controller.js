import AppView from '../views/app';
import Marionette from 'backbone.marionette';
import actionChannel from '../channels/action';
import projectChannel from '../channels/project';
import contextChannel from '../channels/context';

export default Marionette.Object.extend({

  initialize: function() {
    this.view = new AppView();
    this.router = this.options.router;
  },

  redirectTo: function() {
    // @todo remove this and set up a real "home"
    this.goto('inbox');
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
  },

  goto: function(route) {
    this.router.navigate(route);
    this[route]();
  }
});
