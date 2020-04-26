var mongoose = require('mongoose');
var dbURI = 'mongodb://@mongodb:27017/foliodb';
console.log('Connecting to MongoDB...') 
mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
	console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err) {
	console.log('Mongoose connection error ' + err);
});

mongoose.connection.on('disconnected', function() {
	console.log('Mongoose disconnected');
});

gracefulShutdown = function (msg, callback) { 
	mongoose.connection.close (function () {
		console.log('Mongoose disconnected through ' + msg);
		callback () ;
	});
};

// For nodemon restarts
process.once ('SIGUSR2', function () { 
	gracefulShutdown ('nodemon restart', function () {
		process.kill (process.pid, 'SIGUSR2');
	});
});

// For app termination 
process.on('SIGINT', function() { 
	gracefulShutdown ('app termination', function () {
		process.exit(0); 
	}); 
}); 

// For Heroku app termination
process.on('SIGTERM', function () { 
	gracefulShutdown ( 'Heroku app shutdown', function () {
		process.exit(0);
    });
});

// BRING IN YOUR SCHEMAS & MODELS
require('./investments');
require('./users');

// Initialize database with data

// oc rsh <mongodb-pod>
// mongo foliodb -u user -p password
// > show collections (I think the collections are auto-created when clicking login button but they are empty)

// > db.investments.save({ investor: 'kevin', password: 'kevin1', investments: [{  symbol: 'btc',  shares: 0.028644 }, {  symbol: 'iot',  shares: 100 }, {  symbol: 'eth',  shares: 0.25 }]})
// > db.investments.find()

// The users document can be initialized by calling the register api as shown at the bottom of the users.js model
// > db.users.find()

// Some other sample queries below:
// db.inventory.insertMany( [
//    { item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
//    { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "A" },
//    { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
//    { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
//    { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" }
// ]);
// 
// var cursor = db.collection('investments').find({ 
//   username: "kevin"
// }).project({ password: 1 });
// 
// db.investments.find( { username: "kevin" }, { password: 1 } )
// 
// db.investments.find({ username: "kevin" }, { password: 1, _id: 0 })
// 
// db.investments.update( { investor: "kevin" }, { $set: { "investments.1": { "symbol" : "miota", "shares" : 100 } } } )
