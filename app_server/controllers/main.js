// includes
var CoinMarketCap = require("node-coinmarketcap");
var coinmarketcap = new CoinMarketCap();
var yahooFinance = require('yahoo-finance');
global.fetch = require('node-fetch');
const cc = require('cryptocompare');
var Quandl = require("quandl");


// setup request
var request = require('request');
var apiOptions = {
  server : "http://localhost:8080"
};
// The following lines can be used to read environment variables
//if (process.env.NODE_ENV === 'production') {
//  apiOptions.server = "http://" + process.env.NODEJS_SERVICE_HOST + ":8080"
//}

var getPrices = function (req, res, body) {

  console.log(`${req.method} request for '${req.url}'`);

  // Extract the investments symbols for a user as stored in DB
  // and hold them in an array
  var inv = body.investments;
  var sym = [];

  for (var i = 0; i < inv.length; ++i) {
    sym[i] = inv[i].symbol;
  }

// Convert symbols to uppercase 
  var symUpper = sym.map(item => item.toUpperCase());

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

    // Now that the investment prices are in memory, call the Quandl
    // service to get economic data.  Don't render the page until after 
    // the values are returned from Quandl to avoid page errors.  Use
    // a callback for this.  MAYBE performance can be improved by 
    // rednering the page before Quandl values are returned.
    var eco = getEcon(res, inv, renderFolio);
    
  })
  .catch(console.error)
}

var renderFolio = function(res, invest, econ){
  // Transfer the values returned from the API to the ejs/html for rendering
  console.log('renderFolio...');
  res.render('index', {invest: invest,econ: econ}); 
}; 

function getEcon(res, inv, callback) {

  // Call two quandl APIs to get economic data.  Add the second call to the
  // callback function so that the second call doesn't start until the first
  // call is completed.  Quandl only allows one simultaneous call for free accounts.
  // Not sure how strictly this is enforced.  Could try simultaneous call for increased performance.
  var quandl = new Quandl({
    auth_token: "355y_8xEVWRpmVmQBzMB",
    api_version: 3
  });
   
  quandl.dataset({
    source: "RATEINF",
    table: "INFLATION_USA"
  }, {
    limit: 1,
  }, function(err, response){
      if(err)
          throw err;

      // Store the return data from the first in an array    
      var qData = JSON.parse(response).dataset.data; 
            
      quandl.dataset({
        source: "FED", 
        table: "RIFSPFF_N_D"
      }, {
        limit: 1,
      }, function(err, response){
          if(err)
              throw err;
    
          // Concatenate the return data from the second call
          // in the same array as the first call     
          var intData = JSON.parse(response).dataset.data; 
          qData = qData.concat(intData);

          // Render the page using the values from the API calls
          callback(res, inv, qData);
      });
  });
}; 

module.exports.getHome = function(req, res) {
  // Insert the calculated values into the html and render it
  res.render('home',{});
};

module.exports.getFolio = function(req, res) {
  console.log("app server get username from cookie " + req.payload.username);
  // call internal api to retrieve user's investments
  var requestOptions, path;
  path = '/api/users/' + req.payload.username;
  
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json: {},
  }
  console.log(requestOptions);
  request (
    requestOptions,
    function(err, response, body) {
      console.log('getPrices...');
      getPrices(req, res, body); 
    }
  );
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML of the response.
};