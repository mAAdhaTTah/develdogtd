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
app.use('/', require('./routes'));

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

var io = require('socket.io')(server);
var ios = require('socket.io-express-session');

io.use(ios(session));
io.on('connection', function() {
  debug('Socket Connection');
});
