require('./application/shim');

var Application = require('./application');

var app = new Application();

// Start history when our application is ready
app.on('start', function() {
  Backbone.history.start();
});

app.start();

module.exports = app;
