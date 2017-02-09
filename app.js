var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var jwt = require('express-jwt');

global.AppRoot = path.resolve(__dirname);
// var config = require(path.join(__dirname, 'configurations/config'));
var oAuth = require(path.join(__dirname, 'configurations/auth'));
var job = require(path.join(__dirname, 'lib/cronjob'));
// job.start();
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/image',express.static(path.join(__dirname, '/public/images')));
app.use(cors());
 
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
var authCheck = jwt({
  secret: oAuth.AuthO.clientSecret,
  audience: oAuth.AuthO.clientID
});

function getJWTToken(req) {
  var parts = req.headers.authorization.split(' ');
  if (parts.length == 2) {
    var scheme = parts[0];
    var credentials = parts[1];
    if (/^Bearer$/i.test(scheme)) {
      return credentials;
    }
  }
  return false;
}
/*app.use(function(req, res, next) {
  console.log(req);
  next();
});*/

var routes = require('./routes/index');
var items = require('./routes/item')(authCheck);
var zips=require('./routes/zip')();
/*app.use('/api', function(req, res, next) {
  if('get' === req.method.toLowerCase()) {
    return next('route');
  }
  return next();
}, authCheck);*/
app.use('/', routes);
app.use('/items', items);
app.use('/zips',zips);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
