var express = require('express');
var router = express.Router();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var session = require('express-session');
var passport = require('./common/passport');
var FileStore = require('session-file-store')(session);
var config = require('./config');
var debug = require('debug')('develdogtd:server');

var app = express();

// view engine setup
var hbs = exphbs.create({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'templates/layouts/'),
    partialsDir: {
        dir: path.join(__dirname, 'templates/partials/')
    },
    defaultLayout: 'main.hbs'
});
app.engine('.hbs', hbs.engine);
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(require('express-promise')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  store: new FileStore({
    path: './sessions'
  }),
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, './public')));

app.use('/', require('./routes/public'));
app.use('/auth', require('./routes/auth'));
app.use('/app', require('./routes/app'));
app.use('/api', require('./routes/api'));

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    debug(err);
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  debug(err);
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = app;
