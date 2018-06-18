var {User} = require('./userSchema');
var bcrypt = require('bcrypt');

exports.addNewUser=function addNewUser(user , callback) {
		User.save(function (err, userdata) {
			if (err) {
				reject("Schema validation error:",err.errors['emailId'].message,'Email is not a valid Email');
				reject("Schema validation error:",err.errors['username'].message,' Username should be in alphabets!');
				reject("Schema validation error:",err.errors['password'].message,'password can not be empty!');
			}  
			else {
				console.log(userdata);
		  	resolve(userdata);
			}
		});		 
}


//insert new users into the database -. sign up functionality
/*exports.newUser = function (userdata) {
    //return the promise object
    return User(userdata);//passes the userdata to user model
}*/


/*search of the user on the basis of email from the database */
exports.checkUserEmail = function (emailId) {
    return User.findOne({ emailId: emailId })
}

//generating a hash
exports.hashpass = function (password, saltRounds) {
    var hash = bcrypt.hashSync(password, saltRounds);
    //console.log(hash);
    return hash;
}
// checking if password is valid when user login
exports.validPassword = function (password, dbPassword) {

    return bcrypt.compareSync(password, dbPassword);
};
//  module.exports =User;

//get user data using his '_id'
exports.getUserData = function(userId){
    return User.findOne({ _id : userId })
}

