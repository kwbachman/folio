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
