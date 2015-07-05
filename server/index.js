var express = require('express');
var router = express.Router();
var path = require('path');
var config = require('../config');
var debug = require('debug')('develdogtd:server');
var http = require('http');

var app = express();

/**
 * Get port from environment and store in Express.
 */
app.set('port', config.web.port);

/**
 * Register express middleware
 */
app.use(require('express-promise')());
var session = require('./middleware/session')(app);
require('./middleware/views')(app);
require('./middleware/logger')(app);
require('./middleware/parsing')(app);
require('./middleware/auth')(app);

/**
 * Serve static files
 */
app.use(express.static(path.join(__dirname, '../public')));

/**
 * Register routes
 */
app.use('/', require('./routes/http'));

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(app.get('port'));

/**
 * Event listener for HTTP server "error" event.
 */
server.on('error', function(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

/**
 * Event listener for HTTP server "listening" event.
 */
server.on('listening', function() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
});

/**
 * Create websocket
 */
var io = require('socket.io')(server);
var pio = require('passport.socketio');

/**
 * Register socket.io middleware
 * @todo move this authorize function to middleware
 */
io.use(pio.authorize({
  cookieParser: require('cookie-parser'),
  key: 'connect.sid',
  secret: config.sessionSecret,
  store: session.store,
  success: function(data, next) {
    next();
  },
  fail: function(data, message, error, next) {
    if (error) {
      next(new Error(message));
    }
  }
}));
io.use(require('./middleware/setup'));
io.use(require('./routes/socket/user'));
io.use(require('./routes/socket/actions'));
io.use(require('./routes/socket/projects'));
io.use(require('./routes/socket/contexts'));

/**
 * Event listener for websocket "connection" event
 */
if (config.debug) {
  io.on('connection', function(socket) {
    debug('Socket Connection from user id ' + socket.request.user);
  });
}
