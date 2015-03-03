var Task = require('../models/task');

module.exports = function() {
  return {
    q: Task.forge(),

    action: function(user_id) {
      this.q.set({
        type: 'action',
        user_id: user_id
      });

      return this;
    },

    project: function(user_id) {
      this.q.set({
        type: 'project',
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
