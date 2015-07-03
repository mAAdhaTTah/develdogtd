import { ItemView } from 'backbone.marionette';
import _ from 'lodash';
import globalChannel from '../channels/global';
import template from './template.hbs';

export default ItemView.extend({

  /**
   * Whether this view will be removed by a refresh
   */
  willRemove: false,

  /**
   * Class name for individual action views
   */
  className: 'action',

  /**
   * Template for the individual actions
   */
  template,

  /**
   * Behaviors associated with this view
   */
  behaviors: {
    CompleteButton: {
      behaviorClass: require('../behaviors/completeButton')
    },
    ContextField: {
      behaviorClass: require('../behaviors/contextField')
    },
    DeleteButton: {
      behaviorClass: require('../behaviors/deleteButton')
    },
    ErrorDisplay: {
      behaviorClass: require('../behaviors/errorDisplay')
    },
    DueField: {
      behaviorClass: require('../behaviors/dueField')
    },
    NameField: {
      behaviorClass: require('../behaviors/nameField')
    },
    NotesField: {
      behaviorClass: require('../behaviors/notesField')
    },
    ProjectField: {
      behaviorClass: require('../behaviors/projectField')
    }
  },

  /**
   * UI hash
   */
  ui: {
    completed: '.completed',
    context: '.context-id',
    delete: '.delete',
    due: '.due',
    name: '.name',
    notesedit: '.edit-notes',
    notesfield: '.notes',
    project: '.project-id'
  },

  /**
   * This view will be destroyed if the model matches
   * either the project_id or context_id passed into the function
   *
   * @param project_id
   * @param context_id
   * @returns {*}
   */
  maybeDestroy: function(project_id, context_id) {
    if (this.model.get('completed')) {
      return this.destroy();
    }

    if (project_id === this.model.get('project_id')) {
      return this.destroy();
    }

     if(context_id === this.model.get('context_id')) {
       return this.destroy();
     }

    return false;
  },

  /**
   * Saves the model without overloading the server
   */
  saveModel: _.debounce(function(key, value) {
    this.model.save(key, value).fail(function() {
      globalChannel.command('error');
    });
  }, 800)
});
