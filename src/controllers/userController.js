const User = require('../models/userModel');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var r = require('../tokenGenerate');
var Token = require('../models/tokenModel');
var tokenChecking = require('../functionality/tokenCheckingmw')

/*----- FOR SIGN UP - create user accounts-------*/
exports.addNewUser = (req, res) => {

    console.log("from clientside data coming: ", req.body)
    console.log(Object.keys(req.body))
    var emailId = req.body.email;
    var username = req.body.username;
    var password = req.body.password;

    console.log("headers", req.headers.authorization);
    if (req.headers.authorization === 'null' && Object.keys(req.body) != 0) {
        User.findOne({ emailId: emailId })
            .then(users => {
                console.log("ss", users)
                //     if (users == null)
                //     res.status(200).json({ message: 'not there' });
                // else{
                //     res.status(200).json({emailId:users.emailId, message: 'already' });
                //  }
                // emailId:users.emailId})
                if (!users) {
                    // res.status(200).json({ message: 'not there' });
                    var hash = bcrypt.hashSync(password, saltRounds);

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
                    console.log("else part")
                    //    if (users.emailId == req.body.emailId)
                    res.status(200).json({ emailId: users.emailId, message: 'already' });
                    //  res.status(409).send({error:"email Id already exist",message:""});
                    //res.status(400).send({error:"email Id already exist"})
                    //redirect to dashboard
                }

            })
            .catch(err => {
                console.log('Error occured not able to find emailid from mongoose ', err);
                res.status(500).send({ error: err, message: "Some error occurred while creating the User" });
            })
    }
    else {
        Token.findOne({ token: req.headers.authorization })
            .then((doc, err) => {
                if (doc) {
                    console.log("Got token")
                    User.findOne({ _id: doc.uId })
                        .then((user) => {
                            if (user) {
                                console.log("Got user", user)
                                res.status(200).send({ message: 'Got user' });
                            }

                        })
                        .catch(() => {
                            res.status(409).send({ error: "didnt get user", message: "" });
                            console.log("didnt get user")

                        })
                }
            })
    }
}


/*---------------------FOR login---------------------------*/
exports.userLogin = (req, res) => {
    console.log("from clientside login data coming: ", req.body);
    var emailId = req.body.loginEmail;
    var password = req.body.loginPassword;
    //var hashPassword = bcrypt.hashSync(password, global.salt);
    console.log("hashpassword login", password);

    //find user by request email value->search for the user in the database
    User.findOne({ emailId: emailId })
        .then((userObj) => {
            console.log("userobj find", userObj);

            var tokenobj = {};

            if (bcrypt.compareSync(password, userObj.password)) {
                tokenobj.uId = userObj._id;
                tokenobj.token = r.randomToken();
                tokenobj.timestamp = new Date().getTime();

                Token(tokenobj).save(function (err, tokenOb) {
                    if (err) throw err
                    console.log("token SAVE SUCCESSFUL for new login user")
                    res.status(200).send({ authtoken: tokenOb.token });
                })
            }
            else {
                console.log("PASSWORD not MATCHING ");
                res.status(401).send({ error: "please enter valid password" });
            }
        })
        .catch(err => {
            console.log('Error occured not able to find emailid and password from mongoose ', err);
        })

}

/*-----------------for logout--------------*/

exports.logout = (req, res) => {
    console.log("logoutbody", req.body);
    //  console.log("tokenlog", req.headers.authorization);
    var token = req.headers.authorization;
    Token.findOneAndRemove({ token: token })
        .then((tokendoc) => {
            //console.log("tokenobject", tokendoc);
            res.status(200).send({ message: "token deleted successfully!" });
        })
        .catch((err) => {
            res.status(400).send({ error: err, message: "Some Error occured " });
        })
}

exports.dashboard = (req, res) => {
}

// Retrieve and return all users from the database.
exports.findAllUsers = (req, res) => {
    User.find()
        .then(users => {
            res.status(200).send({ users });
        }).catch(err => {
            console.log(err)
            /* res.status(500).send({
                 message: "Some error occurred while retrieving users."
             });*/
        });
};

