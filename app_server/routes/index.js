var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
// var auth = jwt({
//   secret: 'kaiya',
//   userProperty: 'payload'
// });
var auth = jwt({
   secret: 'kaiya',
   userProperty: 'payload',
   getToken: function (req) {
   	console.log(req.cookies.access_token);
    return req.cookies.access_token; 
   }
});

var ctlrMain = require('../controllers/main');

router.get('/', ctlrMain.getHome);
router.get('/investments', auth, ctlrMain.getFolio);

module.exports = router;

