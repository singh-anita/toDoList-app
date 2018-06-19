const User = require('../models/userModel');
//const saltRounds = 10;
var r = require('../tokenGenerate');
var Token= require('../models/tokenModel');
exports.addNewUser = (req, res) => {
 
    console.log("from clientside data coming: ", req.body)

    var emailId = req.body.email;
    var username = req.body.username;
    
 
    User.findOne({emailId:emailId})
    .then(users => {
        if(!users){
            var password =req.body.password;
            var confirmPassword = req.body.confirmPassword;
               // test a matching password
           users.comparePassword(password, function(err, isMatch) {
             if (err) throw err;
            console.log("checking password match",password, isMatch); // -> Password123: true
           });
           //password;
            //confirmPassword;
          /*  if(!password.equals(confirmPassword)){
                //"Password doesn't match");
                //redirect to signup
            }*/
               // Create a User
               const user = new User({
                emailId: emailId, 
                username:username,
                password: password
            });
            // Save User in the database
            var userdata = {};
            var tokendata = {};
            user(userdata).save()
            .then(data => {
                // if (err) throw err
                console.log("userdat SAVE SUCCESSFUL")

                // var obj = {}
                tokendata.uId = data._id;
                tokendata.token = r.randomToken()
                tokendata.timestamp = new Date().getTime()

                Token(tokendata).save(function (err, data) {
                    if (err) throw err
                    console.log("token SAVE SUCCESSFUL")
                    setTimeout(() =>{ 
                        res.status(200).send({ authtoken: data.token });
                     }, 2000)
                })
            })
            .catch(err => {
                res.status(401).send({error:"user already exist"})
                //res.redirect("/signup");
            });
        }

        else{

        }
        }).catch(err => {
            if (err) throw err
           //errmessage
            //res.redirect("/signup");
        })
    }
