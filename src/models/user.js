var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dbase = mongoose.createConnection("mongodb://localhost/");
var bcrypt = require('bcrypt');
//const db = dbase.useDb('local')
const db = dbase.useDb('todoapp')
//mongoose.connect('mongodb://localhost/local');

// create a schema
var UserSchema = new Schema({
    emailId: String,
    username: String,
    password: String,
  //  token: String,
 //   timestamp : Number
});
var TokenSchema = new Schema({
    uId: String,
    token: String,
   timestamp : Number
})
/* the schema is useless so far we need to create a model using it*/
var User = db.model('User', UserSchema);
var Token =db.model('Token',TokenSchema);
/*var u = new User({
    username: "sree",
    name: "SreeraG",
    emailId: 'sree@abc.com',
    // 'password' will be hashed
    password: 'def',
})

u.save(function(err,doc){
    if(err) throw err

    console.log("INSERT SUCCESSFUL!!")
    console.log("doc : ", doc)

})*/
//insert new users into the database -. sign up functionality
exports.newUser = function(userdata){
    //return the promise object
    return User(userdata);//passes the userdata to user model
}
//insert new token into the database -. sign up functionality
exports.newToken = function(tokendata){
    //return the promise object
    return Token(tokendata);//passes the token data to user model
}
// search for the user in the database -> login functionality
exports.loginUser = function (email, password) {

    return userdata.findOne({ emailId: email, password: password }, function (err, obj) {
         if (err) throw err;
         console.log(obj);
     })
 }
 //generating a hash
 exports.hashpass = function (password, saltRounds) {
     console.log("password :" , password);
     console.log("sR : ", saltRounds)
    return hash = bcrypt.hashSync(password, saltRounds);
    // return hash;
}
 // checking if password is valid
 exports.validPassword = function(password , dbPassword) {

    return bcrypt.compareSync(password,dbPassword);
};
//  module.exports =User;
/*find email*/
exports.checkUserEmail = function(emailId){
    return User.findOne({emailId : emailId})
}
//for token 
exports.checkuId= function(token){
    return Token.findOne({token : token})
}