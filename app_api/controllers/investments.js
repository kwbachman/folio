var mongoose = require('mongoose');
var Invest = mongoose.model('Investment');

var sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
}

module.exports.investmentsGetOne = function (req, res) {
	sendJsonResponse(res, 200, {"status" : "success"});
}

module.exports.investmentsGet = function (req, res) {
  console.log('Getting investments for a user...')
  console.log("Finding investor with username " + req.payload.username);
  if (req.payload.username) {
    // Invest
    //   .findById(req.params.userId)
    Invest
        .findOne({ 'investor': req.payload.username })
        .exec(function(err, investor) {
        if (!investor) {
          sendJsonResponse(res, 404, {
            "message": "investor not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJsonResponse(res, 404, err);
          return;
        }
        sendJsonResponse(res, 200, investor);
      });
  } else {
    console.log('No username specified');
    sendJsonResponse(res, 404, {
      "message": "username in request"
    });
  }
};

var getInvestor = function(req, res, callback) {
  console.log("Finding investor with username " + req.payload.username);
  if (req.payload.username) {
    Invest
      .findOne({ investor : req.payload.username })
      .exec(function(err, investor) {
        if (!user) {
          sendJSONresponse(res, 404, {
            "message": "User not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(investor);
        callback(req, res, investor);
      });

  } else {
    sendJSONresponse(res, 404, {
      "message": "User not found"
    });
    return;
  }

};

module.exports.investmentsCreate = function (req, res) {
	sendJsonResponse(res, 200, {"status" : "success"});
}

module.exports.investmentsUpdateOne = function (req, res) {
	sendJsonResponse(res, 200, {"status" : "success"});
}

module.exports.investmentsDeleteOne = function (req, res) {
	sendJsonResponse(res, 200, {"status" : "success"});
}
