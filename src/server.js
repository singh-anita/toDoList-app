var express = require('express'); // call express
var app = express();  // define our app using express
var bodyparser = require("body-parser");
var { checkUserEmail, newUser, hashpass, validPassword } = require('./models/user');
//var hp = require('./passHash');
var r= require('./tokenGenerate');
var passport = require('passport');
var flash = require('connect-flash');
const saltRounds = 10;
//import { Route, Link, Switch, Redirect } from 'react-router-dom';
//var db ='mongodb://localhost/test';
//mongoose.connect(db); // connect to our database
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
   // res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

/* configure app to use bodyParser()-> this will let us get the data from a POST*/
app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({extended: true}))

/* required for passport*/
app.use(passport.initialize());

/* FOR SIGN UP - create user accounts*/
app.post('/signup', function (req, res) {
    var userdata = {};
    userdata.emailId = req.body.email;
    userdata.username = req.body.username;
    userdata.password = hashpass(req.body.password, saltRounds);/*Store hash in your password DB.*/
    userdata.token = //random token generate
    userdata.timestamp = new Date().getTime(); 

    console.log("HASH VALUE : ", userdata.password)
    console.log("user obj created ", userdata);
    newUser(userdata).save(function (err, data) {
        if (err) throw err
        console.log("SAVE SUCCESSFUL")
    })

    // var timestamp = 
    // r.randomToken()


});

// FOR login
app.post('/', function (req, res) {
  ///  var token = r.randomToken().then(console.log(res)) ;
   // console.log(r.ab)
    r.randomToken(function(name){
        console.log(name);
    })
    //return <Redirect to="/login" />;
    var userlogin = {};
    userlogin.emailId = req.body.loginEmail;
    userlogin.password = req.body.loginPassword;
    console.log(userlogin)
    checkUserEmail(userlogin.emailId).then((userObj, err) => {
        if(err)throw err;
        console.log("IS IT RIGHT : ", validPassword(userlogin.password, userObj.password))
      // 
    });
})

// testing for random token storage
app.post('/test', function(req,res){
    console.log("IN / TEST")
    var x= randomToken();
    Console.log(x)
   /* var x =  r.randomToken(function(name){
        return name;
    })*/
})


app.listen(3001);




/*

if(!userlogin.emailId){
            console.log('User Not Found with email: '+userlogin);
            return done(null, false,req.flash('message', 'User Not Found.'));
        }
        if(!isValidPassword(userlogin, password)){
            console.log('Invalid Password');
            return done (null, false,req.flash('message', 'Invalid Password'));
        }
        return done(null, user);







        console.log("REQUEST : ",  userlogin.password)
    var isValidPassword = function(userlogin, password){
        var result = bcrypt.compareSync(password, userlogin.password);
        if (result) {
         console.log("Password correct");
        } else {
        console.log("Password wrong");
        }
        return result;
    
     }


*/