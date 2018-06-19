const User = require('../models/userModel');
var bcrypt = require('bcrypt');
// const saltRounds = 10;
var r = require('../tokenGenerate');
var Token = require('../models/tokenModel');


/*----- FOR SIGN UP - create user accounts-------*/
exports.addNewUser = (req, res) => {

    console.log("from clientside data coming: ", req.body)

    var emailId = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    // User.find({}).then((user)=>{
    //     console.log(user)
    // },(err)=>{
    //     console.log(err)
    // })
    User.findOne({ emailId: emailId })
    .then(users => {
        console.log("ss",users)
        if(!users){
        // var userdata = {};
        // userdata.emailId = req.body.email;
        // userdata.username = req.body.username;
        // userdata.password =req.body.password;
        //bcrypt.hashSync(password, saltRounds);
        // userdata.password = hashpass(req.body.password, saltRounds);//
        var hash = bcrypt.hashSync(password, global.salt);

        const userdata = {
        emailId : emailId , 
        username: username ,
        password: hash
        };
        
        // Save User in the database
        var tokendata = {};
        User(userdata).save()
        .then(data => {
        // if (err) throw err
        console.log("userdata SAVE SUCCESSFUL",data)
        
        // var obj = {}
        tokendata.uId = data._id;
        tokendata.token = r.randomToken()
        tokendata.timestamp = new Date().getTime()
        
        Token(tokendata).save(function (err, data) {
        if (err) throw err
        console.log("token SAVE SUCCESSFUL")
        setTimeout(() =>{ 
        res.status(200).send({ authtoken: data.token, message: 'Create user successful with token'});
        }, 2000)
        })
        })
        }
        else{
        console.log("else part")
        res.status(409).send({error:"email Id already exist",message:""});
        //res.status(401).send({error:"email Id already exist"})
        //redirect to dashboard
        }
        
    })
    .catch(err => {
        console.log('Error occured not able to find emailid from mongoose ', err);
        res.status(500).send({error:err,message:"Some error occurred while creating the User"});
        //errmessage
        //res.redirect("/signup");
    })
        
}

/*---------------------FOR login---------------------------*/
exports.userLogin = (req, res) => {
    console.log("from clientside login data coming: ", req.body);
    var emailId = req.body.loginEmail;
    var password = req.body.loginPassword;
    //var hashPassword = bcrypt.hashSync(password, global.salt);
    console.log("hashpassword login",password);

    //find user by request email value->search for the user in the database
    User.findOne({ emailId: emailId })
    .then((userObj) => {
        console.log("userobj find", userObj);
        if(!userObj){
            console.log("Invalid username or password entered!")
            res.status(400).send({error:"Invalid username or password entered",message:""});
        }
        else{
        var tokenobj = {};
       // var validPassword  = bcrypt.compareSync(hashPassword, userObj.password);
        
        console.log("IS PASSWORD MATCHING : ", validPassword);
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
}
    })
    .catch(err => {
        console.log('Error occured not able to find emailid and password from mongoose ', err);
    })

}

/*-----------------for logout--------------*/

exports.logout = (req,res)=>{
    console.log("logoutbody",req.body);
    console.log("tokenlog", req.headers.authorization);
    var token =req.headers.authorization;
    Token.findOneAndRemove({token:token })
    .then((tokendoc)=>{
        console.log("tokenobject", tokendoc);
        res.status(200).send({ message: "token deleted successfully!" });
    })
    .catch((err)=>{
        res.status(400).send({error:err,message:"Some Error occured "});
    })
   /* deleteUserToken(req.headers.authorization).then((tokendoc, err) => {
        // if (!tokendoc) {res.status(404).send({message:"token not found "})}
        console.log("tokenobject", tokendoc)
        if (err) throw err;
        res.status(200).send({ message: "token deleted successfully!" });
    })*/
}

exports.dashboard = (req,res)=>{
}

// Retrieve and return all users from the database.
exports.findAllUsers = (req, res) => {
	User.find()
    .then(users => {
        res.status(200).send({users});
    }).catch(err => {
        console.log(err)
       /* res.status(500).send({
            message: "Some error occurred while retrieving users."
        });*/
    });
};

