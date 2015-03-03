var Checkit = require('checkit');

module.exports = {
  task: new Checkit({
    name: 'required',
    type: 'required',
    completed: 'boolean',
    due: 'date',
    project_id: 'numeric'
  })
};
