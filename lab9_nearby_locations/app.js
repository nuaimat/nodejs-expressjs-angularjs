var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var poi = require('./routes/poi');
var MongoClient = require('mongodb').MongoClient;


var app = express();

var config = require('./config_' + app.get('env') + ".json");
app.use((req, res, next) => {
  res.locals.config = config;
  next();
});

var db;

var db_auth = `${config.db_username}:${config.db_password}@`;
if(config.db_username == "" ){
    db_auth = "";
}
var dbConnectionString = `mongodb://${db_auth}${config.db_hostname}:${config.db_port}/${config.db_name}`;
console.log("dbConnectionString: " + dbConnectionString);
// Initialize connection once
MongoClient.connect(dbConnectionString, function(err, database) {
  if(err) throw err;

  db = database;
  app.listen(8080);
  console.log("Listening on port 8080");
});

app.use(function(req,res,next){
  res.db = db;
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/users', users);
app.use('/poi', poi);

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
