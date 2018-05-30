var express = require('express'); // call express
var app = express();  /* define our app using express*/
var bodyparser = require("body-parser");
var { checkUserEmail, newUser, validPassword, newToken, checkuId, insertTitle, getNotesTitle, insertNoteContent } = require('./models/user');
var r = require('./tokenGenerate');
var passport = require('passport');
var flash = require('connect-flash');
const saltRounds = 10;
var bcrypt = require('bcrypt');

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

    console.log("user obj created ", req.headers);
    
    
    if (req.headers.authorization != 'null'){
        console.log("HERTRERRR")
        checkuId(req.headers.authorization).then(
            (doc, err) => {
                if (doc) {

                    console.log("Got token")
                    //200 means the  token is valid
                    res.status(200).send();

                }
                //it means that something is in the body ie the filled form
                //client side validation to be done separately

            }
        )
    }
        
    else 
    if(req.body != {}){
        var userdata = {};
        var tokendata = {};
        console.log("HJGFNJDFBYTFTYU : ", userdata)

        userdata.emailId = req.body.email;
        userdata.username = req.body.username;
        // console.log("PWD : ", bcrypt.hashSync("pwd", saltRounds))
        userdata.password = bcrypt.hashSync(req.body.password, saltRounds);/*Store hash in your password DB.*/



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

/*---------------------------add title ------------------------*/
app.post('/addnotetitle', function (req, res) {
    console.log("req", req.body);
    insertTitle('5b0bc831ccfade2af940e156', req.body.title)
        .then(function (doc, err) {   //returns the inserted document
            if (err) throw err
            console.log("doc", doc);
        })
})


//get all the titles of a specific user - read/retrieve operation
app.get('/gettitles', function (req, res, next) {
    console.log("req", req.body);
    var titleToSend = [];

    getNotesTitle('5b0bc831ccfade2af940e156')
        .then((notesTitleArray, err) => {
            if (err) throw err

            titleToSend = notesTitleArray.map((note) => {
                return { _id: note._id, title: note.title }
            })

            res.status(200).send(titleToSend);

        })



    //    console.log("Unauthorized user")
    //    res.status(401).send();
})

/*---------------------------add Content--------------------------*/
app.post('/addnotecontent', function (req, res) {
    console.log("reqofcontent", req.body);
    insertNoteContent('5b0bc831ccfade2af940e156', req.body.content, req.body.isChecked)
        .then(function (doc, err) {   //returns the inserted Content document
            if (err) throw err
            console.log("content doc", doc);
        })
    // console.log("fd");
});

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

    /* notesTitleArray.map((noteTitle, titleIndex) => {
                    //create a new entry with the title and _id
                    
                    objToSend.push({ _id: noteTitle._id, title: noteTitle.title, date : noteTitle.date })
                    
                })*/
