var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient; 
var MongoServer = require('mongodb').Server; 

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var config = require('./config_' + app.get('env') + '.json');

var crypto = require('crypto'),
    algorithm = 'aes256',
    crypto_password = config.crypto_secret;

var encrypto_wrapper = {
      encrypt: function(text){
                var cipher = crypto.createCipher(algorithm,crypto_password)
                var crypted = cipher.update(text,'utf8','hex')
                crypted += cipher.final('hex');
                return crypted;
              },
      decrypt: function(text){
              var decipher = crypto.createDecipher(algorithm,crypto_password)
              var dec = decipher.update(text,'hex','utf8')
              dec += decipher.final('utf8');
              return dec;
            }
};


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

app.get('/', function(req, res, next) {
  db.collection("myColl").findOne({}, function(err, doc){
    if(err) throw err;
    var enc = doc.message;
    var decrypted  = encrypto_wrapper.decrypt(enc);
    console.log("dec:" + decrypted);

    res.render('index', { title: 'Decrypted Message ', 'decrypted': decrypted });
  });
});
app.use('/users', users);

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

var db;
var dbConnectionString = `mongodb://${config.db_username}:${config.db_password}@${config.db_hostname}:${config.db_port}/${config.db_name}`;
// Initialize connection once
MongoClient.connect(dbConnectionString, function(err, database) {
  if(err) throw err;

  db = database;
  app.listen(8080);
  console.log("Listening on port 8080");
});



module.exports = app;
