const User = require('./models/userModel.js');
const saltRounds = 10;
exports.userRegister = (req, res) => {
 
    console.log("from clientside data coming: ", req.body)

    var email = req.body.email;
    var username = req.body.username;
    
 
    User.findOne({emailId:email})
    .then(users => {
        if(!users){
            var password =req.body.password;//Store hash in your password DB.
            var confirmPassword = req.body.confirmPassword;

            var buf1 = Buffer.from(password);
            var buf2 = Buffer.from(confirmPassword);
            if(!buf1.equals(buf2)){
                res.cookie("registrationError","Password doesn't match");
                res.redirect("/register");
            }
               // Create a User
               const user = new User({
                emailId: email, 
                username:username,
                password: hashpass(password, saltRounds)
            });
            // Save User in the database
            var userdata = {};

            user(userdata).save()
            .then(success => {
                // if (err) throw err
                console.log("userdat SAVE SUCCESSFUL")

                // var obj = {}
                tokendata.uId = data._id;
                tokendata.token = r.randomToken()
                tokendata.timestamp = new Date().getTime()

                newToken(tokendata).save(function (err, data) {
                    if (err) throw err
                    console.log("token SAVE SUCCESSFUL")
                    setTimeout(() =>{ 
                        res.status(200).send({ authtoken: data.token });
                     }, 5000)
                    
                    
                })

            })
            .catch(err => {
                
                res.redirect("/signup");
            });
        }
        }).catch(err => {
            res.cookie("registrationError",err.message);
            res.redirect("/signup");
        })
    }
