var express = require('express');
var router = express.Router();
var ctlrMain = require('../controllers/main');

router.get('/', ctlrMain.getFolio);

module.exports = router;

