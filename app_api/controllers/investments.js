var mongoose = require('mongoose');
var Invest = mongoose.model('Investment');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
}

module.exports.investmentsGetOne = function (req, res) {
	sendJsonResponse(res, 200, {"status" : "success"});
}

module.exports.investmentsCreate = function (req, res) {
	sendJsonResponse(res, 200, {"status" : "success"});
}

module.exports.investmentsUpdateOne = function (req, res) {
	sendJsonResponse(res, 200, {"status" : "success"});
}

module.exports.investmentsDeleteOne = function (req, res) {
	sendJsonResponse(res, 200, {"status" : "success"});
}
