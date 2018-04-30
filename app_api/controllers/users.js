var mongoose = require('mongoose');
var Invest = mongoose.model('Investment');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
}

module.exports.usersReadOne = function (req, res) {
	sendJsonResponse(res, 200, {"status" : "success"});
}

module.exports.usersCreate = function (req, res) {
	sendJsonResponse(res, 200, {"status" : "success"});
}

module.exports.usersUpdateOne = function (req, res) {
	sendJsonResponse(res, 200, {"status" : "success"});
}

module.exports.usersDeleteOne = function (req, res) {
	sendJsonResponse(res, 200, {"status" : "success"});
}
