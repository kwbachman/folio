var path = require('path');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//  Based on OpenShift sample Node application
//  
//  Set variables  
//   import express
var express = require('express'),
    app     = express();

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

console.log('port/ip set...');    

//   import custom mongoose code
require('./app_api/models/db');
require('./app_api/config/passport');

//   import routes
var routes = require('./app_server/routes/index');
var routesApi = require('./app_api/routes/index');
//   import custom controller

// view engine setup
app.set('view engine', 'ejs');    
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.use(express.static("./public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

// handle http requests
app.use('/', routes);
app.use('/api', routesApi);

// error handlers
// Catch unauthorized errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

// start server
app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
