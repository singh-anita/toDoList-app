const User = require('../models/userModel');
//var bcrypt = require('bcrypt');
const crypto = require('crypto')
// const saltRounds = 10;
var r = require('../tokenGenerate');
var Token = require('../models/tokenModel');

/*----- FOR SIGN UP - create user accounts-------*/
exports.addNewUser = (req, res) => {

    console.log("from clientside data coming: ", req.body);
    console.log("headers", req.headers.authorization);
    // console.log(Object.keys(req.body))
    var emailId = req.body.email;
    var username = req.body.username;
    var password = req.body.password;

    if (req.headers.authorization === 'null' && Object.keys(req.body) != 0) {
        User.findOne({ emailId: emailId })
            .then(users => {
                console.log("users object", users);
                //     if (users == null)
                //     res.status(200).json({ message: 'not there' });
                // else{
                //     res.status(200).json({emailId:users.emailId, message: 'already' });
                //  }
                // emailId:users.emailId})
                if (!users) {
                    // res.status(200).json({ message: 'not there' });
                    var hash = crypto.createHash('sha256').update(password).digest('hex');
                    // var hash = bcrypt.hashSync(password, saltRounds);
                    ///  userCredObject.password = crypto.createHash('sha256').update(req.body.passwordSignUp).digest('hex');
                    const userdata = {
                        emailId: emailId,
                        username: username,
                        password: hash
                    };

                    // Save User in the database
                    var tokendata = {};
                    User(userdata).save()
                        .then((data) => {
                            // if (err) throw err
                            console.log("userdata SAVE SUCCESSFUL", data)

                            // var obj = {}
                            tokendata.uId = data._id;
                            tokendata.token = r.randomToken()
                            tokendata.timestamp = new Date().getTime()

                            Token(tokendata).save().
                                then((data) => {
                                    res.status(200).send({ authtoken: data.token, message: 'Create user successful with token' });
                                })
                                .catch((err) => {
                                    res.status(500).send({ error: "Some error occured while creating the token", message: "" });
                                })

                        })
                        .catch((err) => {
                            res.status(500).send({ error: "Some error occured while creating the user", message: "" });
                        })
                }
                else {
                    res.status(200).json({ emailId: users.emailId, message: 'already' });
    
                }

            })
            .catch(err => {
                console.log('Error occured not able to find emailid from mongoose ', err);
                res.status(500).send({ error: err, message: "Some error occurred while creating the User" });
            })
    }
    else {
        console.log("is coming,", req.headers.authorization)
        Token.findOne({ token: req.headers.authorization })
            .then((doc) => {
                if (doc) {
                    console.log("Got token")
                    User.findOne({ _id: doc.uId })
                        .then((user) => {
                            if (user) {
                                console.log("Got user", user)
                                res.status(200).send({ message: 'Got user' });
                            }

                        })
                        .catch((err) => {
                            res.status(409).send({ error:err, message:  "didnt get user" });
                            console.log("didnt get user")

                        })
                }
            })
    }
}


/*---------------------FOR login---------------------------*/
exports.userLogin = (req, res) => {
    console.log("req headers",req.headers.authorization)
    if (req.headers.authorization === 'null' && Object.keys(req.body) != 0) {
        console.log("from clientside login data coming: ", req.body);
        var emailId = req.body.loginEmail;
        var password = req.body.loginPassword;
        console.log("hashpassword login", password);

        //find user by request email value->search for the user in the database
        User.findOne({ emailId: emailId })
            .then((userObj) => {
                console.log("userobj find", userObj);
                var tokenobj = {};
                var hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
                if (hashedPassword === userObj.password) {
                    tokenobj.uId = userObj._id;
                    tokenobj.token = r.randomToken();
                    tokenobj.timestamp = new Date().getTime();
                   
                    Token(tokenobj).save() 
                    .then((data) => {
                        res.status(200).send({ authtoken: data.token, message: 'Created token' });
                    })
                    .catch((err) => {
                        res.status(500).send({ error: "Some error occured while creating the token", message: "" });
                    })
                }
                else {
                    res.status(401).send({ error: "PASSWORD not MATCHING" });
                }
            })
            .catch(err => {
                console.log('Error occured not able to find emailid and password from mongoose ', err);
                res.status(500).send({ error: err, message: "Some error occurred for the User" });
            })
     
    }
    else {
        Token.findOne({ token: req.headers.authorization })
            .then((doc) => {
                if (doc) {
                    User.findOne({ _id: doc.uId })
                        .then((user) => {
                            if (user) {
                                res.status(200).send({ message: 'Got user' });
                            }
                        })
                        .catch((err) => {
                            res.status(409).send({ error: err, message: "didnt get user" });
                        })
                }
            })
    }
}

/*-----------------for logout--------------*/

exports.logout = (req, res) => {
    var token = req.headers.authorization;
    Token.findOneAndRemove({ token: token })
        .then((tokendoc) => {
            //console.log("tokenobject", tokendoc);
            res.status(200).send({ message: "token deleted successfully!" });
        })
        .catch((err) => {
            res.status(409).send({ error: err, message: "Some Error occured " });
        })
}


/*exports.userDashboard = (req, res) => {
    console.log("req headers of dashboard",res.locals.user)
    var token = req.headers.authorization;
    if(res.locals.user.id)
    {
        res.status(200).send({ message: "user token not exist!" });
    }
}*/


// Retrieve and return all users from the database.
/*exports.findAllUsers = (req, res) => {
    User.find()
        .then(users => {
            res.status(200).send({ users });
        }).catch(err => {

            res.status(500).send({
                 message: "Some error occurred while retrieving users."
             });
        });
};*/

