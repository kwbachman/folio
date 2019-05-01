var mongoose = require('mongoose');

var investmentDetailSchema = new mongoose.Schema({
    symbol: String,
    shares: Number
});

var investmentSchema = new mongoose.Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    investments: [investmentDetailSchema]
});

mongoose.model('Investment', investmentSchema);

// db.investments.save({ investor: 'kevin', investments: [{  symbol: 'btc',  shares: 0.028644 }, {  symbol: 'iot',  shares: 100 }, {  symbol: 'eth',  shares: 0.25 }]})

// 

// db.investments.save({ username: 'kevin', password: 'kbachman1', investments: [{ symbol: 'btc', shares: 0.028644 }, { symbol: 'iot', shares: 100 }, { symbol: 'eth', shares: 0.25 }]})

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