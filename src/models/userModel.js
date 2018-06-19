var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./configdb.js');


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


/*UserSchema.pre('save', function(next) {
    var user = this;

// only hash the password if it has been modified (or is new)
if (!user.isModified('password')) return next();

// generate a salt
bcrypt.genSalt(saltRounds, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
    console.log("hash",hash)
        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
});


});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};*/
/* the schema is useless so far we need to create a model using it*/
module.exports = mongoose.model('User', UserSchema);



//exporting database
// module.exports = { User }
