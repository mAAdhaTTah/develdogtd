var Task = require('../models/task');
var Context = require('../models/context/server');

module.exports = function() {
  return {
    action: function(user_id) {
      this.q = Task.forge();

      this.q.set({
        type: 'action',
        user_id: user_id
      });

      return this;
    },

    project: function(user_id) {
      this.q = Task.forge();

      this.q.set({
        type: 'project',
        user_id: user_id
      });

      return this;
    },

    context: function(user_id) {
      // @todo this is stupid, there's gotta
      // be a better way to structure
      // this database interface
      this.q = Context.forge();

      this.q.set({
        user_id: user_id
      });

      return this;
    },

    set: function(data) {
      this.q.set(data);

      return this;
    },

    id: function(id) {
      this.q.set({
        id: id
      });

      return this;
    },

    remaining: function() {
      this.q.set({
        completed: false
      });

      return this;
    },

    all: function() {
      return this.q.query({where: this.q.attributes}).fetchAll();
    },

    one: function() {
      return this.q.fetch();
    },

    save: function() {
      return this.q.save();
    },

    delete: function() {
      return this.q.destroy();
    }
  };
};
