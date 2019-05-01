// includes
var CoinMarketCap = require("node-coinmarketcap");
var coinmarketcap = new CoinMarketCap();
var yahooFinance = require('yahoo-finance');
global.fetch = require('node-fetch');
const cc = require('cryptocompare');


// setup request
var request = require('request');
var apiOptions = {
  server : "http://localhost:8080"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "http"
}
var requestOptions = {
  url : 'http://localhost:8080/api/users/kevin',
  method : "GET",
  json : {}, 
  qs : {
    offset : 20
  }
};

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

    //console.log(inv);
    renderFolio(req, res, inv);

  })
  .catch(console.error)



// investement array after the loop is done looks like this...
// [ { symbol: 'btc', shares: 0.028644, USD: 7549.68, val: 216.25 },
//   { symbol: 'iot', shares: 100, USD: 1.77, val: 177 },
//   { symbol: 'eth', shares: 0.25, USD: 574.25, val: 143.56 } ]

  // Create an object that can be passed into the render method

  // yahooFinance.quote({
  //   symbols: [ 'TSLA', 'SPLK' ] , 
  //   modules: [ 'price' ]      // optional; default modules.
  // }, function(err, quote) {
  //      console.log(quote.TSLA.price.regularMarketPrice);
  //    });

  // Calculate values
  // btcval = (btc*btcshare).toFixed(2);
  // ethval = (eth*ethshare).toFixed(2);
  // iotval = (iot*iotshare).toFixed(2);
  // total = (Number(btcval)+Number(ethval)+Number(iotval)).toFixed(2);

}

var renderFolio = function(req, res, invest){
  // Insert the calculated values into the html and render it
  // res.render('index', {BTC: btc, ETH: eth, IOT: iot, 
  //                          BTCSHR: btcshare, ETHSHR: ethshare, IOTSHR: iotshare,
  //                          BTCVAL: btcval, ETHVAL: ethval, IOTVAL: iotval,
  //                          TOTAL: total});
  console.log(invest);
  res.render('index', {invest: invest});

}; 

var parseApiReturn = function(body) {
    //var index = body.investments.findIndex(p => p.symbol == "eth")
    //var index2 = body.investments.find(p => p.symbol == "eth")
    //console.log(index);
    //console.log(index2.shares);
    var vals = {};
    var inv = body.investments;
    var str;
    //inv.forEach(p => console.log(p.symbol));
    // inv.forEach(function(p) {
    //   console.log(p);
    //   console.log(p.symbol);
    // })
    // for (var i = 0; i < inv.length; ++i) {
    //   vals[i] = inv[i];
    //   str = '"' + inv[i].symbol + '"'
    //   console.log(str);
    //   vals[i].price = i;
    // }
    //console.log(vals);
    for (var i = 0; i < inv.length; ++i) {
      vals[i] = inv[i];
      str = '"' + inv[i].symbol + '"'
      vals[i].price = i;
    }
    console.log(vals); 


    //console.log(body.investments);
  // { investments:
  //  [ { symbol: 'btc', shares: 0.028644 },
  //    { symbol: 'iot', shares: 100 },
  //    { symbol: 'eth', shares: 0.25 } ],
  // _id: '5ad401c0618994b875f29986',
  // username: 'kevin',
  // password: 'kbachman1' }
}; 

module.exports.getFolio = function(req, res) {
  // call internal api to retrieve users investments
  var requestOptions, path;
  path = '/api/users/kevin';
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json: {},
  }
  request (
    requestOptions,
    function(err, response, body) {
      console.log(body);
      console.log(body.investments);
      //parseApiReturn(body);
      //getFolio(req, res);
      getPrices(req, res, body); 
      //renderFolio(req, res, body); 
    }
  );
};