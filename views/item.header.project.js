var projectChannel = require('../channels/project');
var globalChannel = require('../channels/global');

module.exports = Marionette.ItemView.extend({
  willRemove: false,

  className: 'project',

  template: require('../templates/header.project.hbs'),

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

  ui: {
    completed: '.completed',
    context: '.context-id',
    due: '.due',
    name: '.name',
    notesedit: '.edit-notes',
    notesfield: '.notes'
  },

  maybeDestroy: function(project_id, context_id) {
    if (this.model.get('completed')) {
      return this.destroy();
    }

    if (project_id === this.model.get('project_id')) {
      return this.destroy();
    }

    if (context_id === this.model.get('context_id')) {
      return this.destroy();
    }

    return false;
  },

  onBeforeDestroy: function() {
    this.$el.fadeOut();
  },

  saveModel: _.debounce(function(key, value) {
    this.model.save(key, value, {
      error: function(model, response, options) {
        console.log(response);
        var n = noty({
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
