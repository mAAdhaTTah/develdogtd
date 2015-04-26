var Checkit = require('checkit');
var moment = require('moment');

module.exports = {
  task: new Checkit({
    name: 'required',
    type: 'required',
    completed: 'boolean',
    due: {
      rule: function(val) {
        return moment(val).isValid();
      }
    },
    project_id: 'numeric'
  })
};
