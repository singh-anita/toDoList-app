var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/test');
var Schema = mongoose.Schema;

// create a schema
var UserSchema = new Schema({
    username: String,
    name: String,
    emailId: String,
    // 'password' will be hashed
    password: String,
    profilePhoto: Buffer, // the token of the user
    key: String
});
// the schema is useless so far
// we need to create a model using it
 var User = mongoose.model('User',UserSchema);
 module.exports =User;