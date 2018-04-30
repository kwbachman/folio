var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/users');
var ctlrInverstments = require('../controllers/investments');

// users
router.get('/users/:userId', ctrlUsers.usersReadOne);
router.post('/users', ctrlUsers.usersCreate);
router.put('/users/:userId', ctrlUsers.usersUpdateOne);
router.delete('/users/:userId', ctrlUsers.usersDeleteOne);

// investments
router.get('/users/:userId/investments/investmentId', ctlrInverstments.investmentsGetOne);
router.post('/users/:userId/investments', ctlrInverstments.investmentsCreate);
router.put('/users/:userId/investments/investmentId', ctlrInverstments.investmentsUpdateOne);
router.delete('/users/:userId/investments/investmentId', ctlrInverstments.investmentsDeleteOne);

module.exports = router;
