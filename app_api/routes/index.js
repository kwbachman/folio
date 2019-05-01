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


var ctrlUsers = require('../controllers/users');
var ctlrInvestments = require('../controllers/investments');
var ctlrAuth = require('../controllers/authentication');

// users
router.get('/users/:userId', ctrlUsers.usersReadOne);
router.post('/users', ctrlUsers.usersCreate);
router.put('/users/:userId', ctrlUsers.usersUpdateOne);
router.delete('/users/:userId', ctrlUsers.usersDeleteOne);

// investments
router.get('/investments', auth, ctlrInvestments.investmentsGet);
router.post('/users/:userId/investments', ctlrInvestments.investmentsCreate);
router.put('/users/:userId/investments/investmentId', ctlrInvestments.investmentsUpdateOne);
router.delete('/users/:userId/investments/investmentId', ctlrInvestments.investmentsDeleteOne);

// authentication
router.post('/register', ctlrAuth.register);
router.post('/login', ctlrAuth.login);

module.exports = router;
