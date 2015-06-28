import { ItemView } from 'backbone.marionette';
import _ from 'lodash';
import projectChannel from '../channels/project';
import globalChannel from '../channels/global';

export default ItemView.extend({

  /**
   * Whether this view will be removed by a refresh
   */
  willRemove: false,

  /**
   * Class name for the project header view
   */
  className: 'project',

  /**
   * Template for the project header
   */
  template: require('../templates/header.project.hbs'),

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
    DueField: {
      behaviorClass: require('../behaviors/dueField')
    },
    NameField: {
      behaviorClass: require('../behaviors/nameField')
    },
    NotesField: {
      behaviorClass: require('../behaviors/notesField')
    }
  },

  /**
   * UI hash
   */
  ui: {
    completed: '.completed',
    context: '.context-id',
    due: '.due',
    name: '.name',
    notesedit: '.edit-notes',
    notesfield: '.notes'
  },

  /**
   * Saves the model without overloading the server
   */
  saveModel: _.debounce(function(key, value) {
    this.model.save(key, value, {
      error: function(model, response, options) {
        console.log(response);
        noty({
          text: response,
          animation: {
            open: {height: 'toggle'}, // jQuery animate function property object
            close: {height: 'toggle'}, // jQuery animate function property object
            easing: 'swing', // easing
            speed: 500 // opening & closing animation speed
          },
          type: 'error',
          timeout: 3000
        });
      }
    });
  }, 800)
});
