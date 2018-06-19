var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./configdb.js');

//create a schema for Token
var TokenSchema = new Schema({
    uId: String,
    token: String,
    timestamp: Number
});
// //insert new token into the database -. sign up functionality
// exports.newToken = function (tokendata) {
//     //return the promise object
//     return Token(tokendata);//passes the token data to user model
// }
module.exports = mongoose.model('Token', TokenSchema);