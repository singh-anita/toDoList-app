var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/test');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    username: String,
    name: String,
    emailId: String,
    // 'password' will be hashed
    password: String,
    profilePhoto: Buffer, // the token of the user
    key: String
});
module.exports = mongoose.model('User',UserSchema);