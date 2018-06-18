var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./config.js');
//var dbase = mongoose.createConnection("mongodb://localhost/");



// create a schema for user
var UserSchema = new Schema({

    emailId: {
        type: String,
        required: true,
        unique: [true, 'User email required'],
        validate: {
            validator: function (v) {
                var emailRegex = /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                return emailRegex.test(v);
            }
        },
        message: '{VALUE} is not a valid Email!'
    },
    username: {
        type: String,

        validate: {
            validator: function (v) {
                var usernameRegex = /^[a-zA-Z]+$/;
                return usernameRegex.test(v);
            }
        },
        message: '{VALUE} Username should be in alphabets!'
    },
    password:  {
        type: String,

        validate: {
            validator: function (v) {
                    return v != null;
            }
        },
        message: '{VALUE} password can not be empty!'
    }
    //  token: String,
    //   timestamp : Number
});

/* the schema is useless so far we need to create a model using it*/
var User = mongoose.model('User', UserSchema);



//exporting database
module.exports = { User }
