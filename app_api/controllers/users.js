var mongoose = require('mongoose');
var Invest = mongoose.model('Investment');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
}

module.exports.usersReadOne = function (req, res) {
  console.log('Finding user details', req.params);
  if (req.params && req.params.userId) {
    // Invest
    //   .findById(req.params.userId)
    Invest
        .findOne({ 'username': req.params.userId })
    	//.where('investments.symbol').equals('iot')
    	//.select('iot investments.shares')
        .exec(function(err, user) {
        if (!user) {
          sendJsonResponse(res, 404, {
            "message": "userid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJsonResponse(res, 404, err);
          return;
        }
		var index = user.investments.findIndex(p => p.symbol == "eth")
		var index2 = user.investments.find(p => p.symbol == "eth")
		//console.log(index);
		//console.log(index2.shares);
        //console.log(typeof user);
        //var test = user.find()
        //console.log(user.investments);
        //console.log(user.investments[1].shares);

        sendJsonResponse(res, 200, user);
      });
  } else {
    console.log('No userid specified');
    sendJsonResponse(res, 404, {
      "message": "No userid in request"
    });
  }
};

module.exports.usersCreate = function (req, res) {
	sendJsonResponse(res, 200, {"status" : "success"});
}

module.exports.usersUpdateOne = function (req, res) {
	sendJsonResponse(res, 200, {"status" : "success"});
}

module.exports.usersDeleteOne = function (req, res) {
	sendJsonResponse(res, 200, {"status" : "success"});
}
