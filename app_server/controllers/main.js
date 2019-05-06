// includes
var CoinMarketCap = require("node-coinmarketcap");
var coinmarketcap = new CoinMarketCap();
var yahooFinance = require('yahoo-finance');
global.fetch = require('node-fetch');
const cc = require('cryptocompare');


// setup request
var request = require('request').debug = true;
var apiOptions = {
  server : "http://localhost:8080"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "http://" + process.env.NODEJS_SERVICE_HOST + ":8080"
}

// global variables
var btc = 0;
var eth = 0;
var iot = 0;
var btcshare = .028644;
var ethshare = .25;
var iotshare = 100;
var btcval = 0;
var ethval = 0;
var iotval = 0;
var total = 0;

var getPrices = function (req, res, body) {

  //console.log(req);
  //console.log(res);
  //console.log(body);
  console.log(`${req.method} request for '${req.url}'`);

  // Extract the investments symbols for a user as stored in DB
  var inv = body.investments;
  var sym = [];
  var vals = {};
  var money = {};
  var str;

  for (var i = 0; i < inv.length; ++i) {
    sym[i] = inv[i].symbol;
  }

  // Convert symbols to uppercase
  var symUpper = sym.map(item => item.toUpperCase());
  //console.log(symUpper); 

  // Get pricing quotes from CryptoCompare
  cc.priceMulti(symUpper, ['USD'])
  .then(prices => {
    
    // process response data
    // - extract prices and add them to investment array
    // - calculate investment value and add them to investment array
    var test = Object.values(prices);
    for (var i = 0; i < test.length; ++i) {
      inv[i].USD = Number(Object.values(test[i]));
      inv[i].val = Number(((inv[i].shares*inv[i].USD).toFixed(2)));
    }

    console.log(inv);
    renderFolio(req, res, inv);

  })
  .catch(console.error)
}

var renderFolio = function(req, res, invest){
  // Insert the calculated values into the html and render it
  console.log('renderFolio...')
  res.render('index', {invest: invest}); 
}; 

module.exports.getHome = function(req, res) {
  // Insert the calculated values into the html and render it
  res.render('home',{});
};

module.exports.getFolio = function(req, res) {
  console.log("app server get username from cookie " + req.payload.username);
  // call internal api to retrieve users investments
  var requestOptions, path;
  //path = '/api/users/kevin';
  path = '/api/users/' + req.payload.username;
  //path = '/api/investments';
  
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json: {},
  }
  console.log(requestOptions);
  request (
    requestOptions,
    function(err, response, body) {
      //console.log(body);
      console.log('getPrices...');
      getPrices(req, res, body); 
    }
  );
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML of the response.
};