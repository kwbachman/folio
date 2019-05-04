var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(expiry.getTime() / 1000),
  }, "kaiya"); 
};

mongoose.model('User', userSchema);

// Ensure to manually call the register api from Postman with the following parameters to prime the user document:
// POST -- http://localhost/api/register
// BODY --
// x-www-form-urlencoded
// username = kevin
// password = xxxxxxxx
