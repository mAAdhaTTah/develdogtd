var globalChannel = require('../channels/global');

module.exports = Marionette.ItemView.extend({
  willRemove: false,

  className: 'action',

  template: require('../templates/action.hbs'),

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

  onBeforeDestroy: function() {
    this.$el.fadeOut();
  },

  saveModel: _.debounce(function(key, value) {
    this.model.save(key, value).fail(function() {
      globalChannel.command('error');
    });
  }, 800)
});
