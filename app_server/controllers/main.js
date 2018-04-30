var CoinMarketCap = require("node-coinmarketcap");
var coinmarketcap = new CoinMarketCap();

var yahooFinance = require('yahoo-finance');

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

module.exports.getPrices = function (req, res) {

  console.log(`${req.method} request for '${req.url}'`);

  // If you want to check multiple coins, use multi():
  coinmarketcap.multi(coins => {
    console.log(coins.get("BTC").price_usd); // Prints price of BTC in USD
    console.log(coins.get("ETH").price_usd); // Print price of ETH in USD
    console.log(coins.get("MIOTA").price_usd); // Print price of IOTA in USD
    btc = coins.get("BTC").price_usd;
    eth = coins.get("ETH").price_usd;
    iot = coins.get("MIOTA").price_usd
  });

  yahooFinance.quote({
    symbols: [ 'TSLA', 'SPLK' ] , 
    modules: [ 'price' ]      // optional; default modules.
  }, function(err, quote) {
       console.log(quote.TSLA.price.regularMarketPrice);
     });

  // Calculate values
  btcval = (btc*btcshare).toFixed(2);
  ethval = (eth*ethshare).toFixed(2);
  iotval = (iot*iotshare).toFixed(2);
  total = (Number(btcval)+Number(ethval)+Number(iotval)).toFixed(2);

  // Insert the calculated values into the html and render it
  res.render('index', {BTC: btc, ETH: eth, IOT: iot, 
                           BTCSHR: btcshare, ETHSHR: ethshare, IOTSHR: iotshare,
                           BTCVAL: btcval, ETHVAL: ethval, IOTVAL: iotval,
                           TOTAL: total});

}