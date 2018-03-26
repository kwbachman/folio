//  Based on OpenShift sample Node application
//  
//  Set variables
var express = require('express'),
    app     = express();

var path = require('path');

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

var ctlrMain = require('./app_server/controllers/main')

// view engine setup
app.set('view engine', 'ejs');    
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.use(express.static("./public"));

// handle requests for the home page
app.get('/', ctlrMain.getPrices);

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

// start server
app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
