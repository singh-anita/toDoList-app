var express = require('express'); // call express
var app = express();  /* define our app using express*/
var bodyparser = require("body-parser");
var { checkUserEmail, newUser, hashpass, validPassword, newToken, checkuId ,insertTitle} = require('./models/user');
var r = require('./tokenGenerate');
var passport = require('passport');
var flash = require('connect-flash');
const saltRounds = 10;

//var db ='mongodb://localhost/test';
//mongoose.connect(db); // connect to our database
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

/* configure app to use bodyParser()-> this will let us get the data from a POST*/
app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({extended: true}))

/* required for passport*/
//app.use(passport.initialize());

/*----- FOR SIGN UP - create user accounts-------*/
app.post('/signup', function (req, res) {
    var userdata = {};
    var tokendata = {};
    userdata.emailId = req.body.email;
    userdata.username = req.body.username;
    userdata.password = hashpass(req.body.password, saltRounds);/*Store hash in your password DB.*/

    console.log("HASH VALUE : ", req.headers.authorization)
    // console.log("user obj created ", userdata);
    if (req.headers.authorization == "null") {
        console.log("HJGFNJDFBYTFTYU")
        newUser(userdata).save(function (err, data) {
            if (err) throw err
            console.log("SAVE SUCCESSFUL")

            // var obj = {}
            tokendata.uId = data._id;
            tokendata.token = r.randomToken()
            tokendata.timestamp = new Date().getTime()

            newToken(tokendata).save(function (err, data) {
                if (err) throw err
                console.log("token SAVE SUCCESSFUL")
                res.send({ authtoken: tokendata.token, redirect: '/' });
            })

        })
    }
    else {

        console.log("dsfgvhyfvui")
        checkuId(req.headers.authorization).then((tokendata, err) => {

            if (err) throw err;

            console.log("tok", tokendata)

            //check if the token is expired by finding the difference between
            // the time now and the timestamp in the database
            // if (!((new Date().getTime() - tokendata.timestamp) > 3600)) {
                
                res.json({ redirect: '/' })
            // }

        })

    }

});

/*---------------------FOR login---------------------------*/
app.post('/', function (req, res) {

    var userlogin = {};
    userlogin.emailId = req.body.loginEmail;
    userlogin.password = req.body.loginPassword;
    var tokenobj = {};
    // userlogin.token =
    //    console.log(userlogin)
    //    console.log(req.headers.authorization);
    checkUserEmail(userlogin.emailId).then((userObj, err) => {
        if (err) throw err;
        console.log("IS IT RIGHT : ", validPassword(userlogin.password, userObj.password));
        console.log(userObj);
        // if(uId){
        console.log("header", req.headers.authorization);
        if (req.headers.authorization) {
            tokenobj.uId = userObj._id;
            checkuId(tokenobj.uId).then((tokenobj, err) => {
                console.log("tok", tokenobj)
                if (err) throw err;
                res.send({ authtoken: tokenobj.token });
            })
        }
        // }
        //checkuId(uId).then()
        // console.log("tok",userObj.token)
        //   res.send({authtoken : userObj.token});
    })
})

/*---------------------------add title dashboar------------------------*/
app.post('/addnotetitle', function (req, res) {
    console.log("req",req.body);
    req.body.list.map((obj, idx) =>{
        insertTitle('5b0bc831ccfade2af940e156', obj.title)
    .then(function (doc, err) {   //returns the inserted document
        if(err) throw err
        console.log("doc",doc);
    })
    })
})
app.listen(3001, function () {
    console.log("SERVER RUNNING ON PORT 3001")
});




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