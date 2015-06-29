import './shim';
import Backbone from 'backbone';
import AppRouter from './router';
import { Application } from 'backbone.marionette';
import ActionCollection from '../collections/action';
import ProjectCollection from '../collections/project';
import ContextCollection from '../collections/context';

let App = Application.extend({

  /**
   * Initialize the Application components
   */
  initialize: function() {
    let router = new AppRouter();
    let actions = new ActionCollection(window.ddBoot.actions);
    let projects = new ProjectCollection(window.ddBoot.projects);
    let contexts = new ContextCollection(window.ddBoot.contexts);
  }
});

module.exports = new App()
  .on('start', function() {
    Backbone.history.start();
  })
  .start();
