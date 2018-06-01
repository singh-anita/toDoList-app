var express = require('express'); // call express
var app = express();  /* define our app using express*/
var bodyparser = require("body-parser");
var { checkUserEmail, newUser, validPassword, newToken, getUId, getUserData, checkuId,deleteUserToken, insertTitle, getNotesTitle, hashpass, insertNoteContent } = require('./models/user');
var r = require('./tokenGenerate');
var passport = require('passport');
var flash = require('connect-flash');
const saltRounds = 10;
var bcrypt = require('bcrypt');

var LocalStrategy = require('passport-local').Strategy

//var db ='mongodb://localhost/test';
//mongoose.connect(db); // connect to our database
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

app.use(passport.initialize())


//PASSPORT MIDDLEWARE.......
/*passport.use('localStrategy', new LocalStrategy({
    usernameField: 'loginEmail',
    passwordField: 'loginPassword',
    passReqToCallback: true

}, function (req, loginEmail, loginPassword, done) {

    //make some db calls to check token
    //and user validity

    console.log("req : ", req.body)
    console.log("e : ", loginEmail)
    console.log("p : ", loginPassword)

    var token = req.headers.authtoken
    console.log(req.body);
    console.log("token passport: ", req.headers.authtoken)

    if (req.headers.authtoken) {
        console.log("Herrlooo")
    }

    getUId(token)
        .then((doc, err) => {
            if (doc) {
                // console.log("doc",doc)
                console.log("Got token")
                getUserData(doc.uId)
                    .then((doc, err) => {

                        if (doc) {
                            console.log("Got user")
                            done(null, doc)
                        }
                        else {
                            console.log("didnt get user")
                            done({ error: "THIS IS AN ERROR" })
                        }
                    })
            }

            else {
                console.log("didnt get token")
                done({ error: "THIS IS AN ERRORZZZZZ" }, { info: "INFOZZZZZ" })
            }
        })

}))*/


function tokenCheckingMiddleware(req, res, next) {
console.log("hello m here")
//console.log("tokench",req.headers)
console.log(req.headers.authorization)
    if (req.headers.authorization) {
        getUId(req.headers.authorization)
            .then((doc, err) => {
                if (doc) {
                    console.log("Got token")
                    getUserData(doc.uId)
                        .then((doc, err) => {

                            if (doc) {
                                next();
                                console.log("Got user")
                            }
                            else {
                                // unauthorized....
                                res.status(401).send()
                                console.log("didnt get user")
                            }
                        })
                }

                else {
                    res.status(401).send()
                    console.log("didnt get token")
                }
            })
    }
    else {
        res.status(401).send()
    }




}






/* configure app to use bodyParser()-> this will let us get the data from a POST*/
app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({extended: true}))

/* required for passport*/
//app.use(passport.initialize());

/*----- FOR SIGN UP - create user accounts-------*/
app.post('/signup', function (req, res) {

    if (req.headers.authorization != 'null') {
        console.log("user token already exist so redirect to dashboard with token", req.headers.authorization);
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
        if (Object.keys(req.body) != 0) {
            var userdata = {};
            var tokendata = {};
            console.log("from clientside data coming: ", req.body)

            userdata.emailId = req.body.email;
            userdata.username = req.body.username;
            // console.log("PWD : ", bcrypt.hashSync("pwd", saltRounds))
            userdata.password = hashpass(req.body.password, saltRounds);/*Store hash in your password DB.*/



            newUser(userdata).save(function (err, data) {
                if (err) throw err
                console.log("userdat SAVE SUCCESSFUL")

                // var obj = {}
                tokendata.uId = data._id;
                tokendata.token = r.randomToken()
                tokendata.timestamp = new Date().getTime()

                newToken(tokendata).save(function (err, data) {
                    if (err) throw err
                    console.log("token SAVE SUCCESSFUL")
                    res.status(200).send({ authtoken: data.token });
                })

            })
        }

});

/*---------------------FOR login---------------------------*/
app.post('/login',function (req, res) {
    if (req.headers.authorization != 'null') {
        console.log("loginuser token already exist so redirect to dashboard with token", req.headers.authorization);
        getUId(req.headers.authorization)
        .then((doc, err) => {
            if (doc) {
                console.log("Got token")
                getUserData(doc.uId)
                    .then((doc, err) => {

                        if (doc) {
                            res.status(200).send({ authtoken: doc.token });
                           // next();
                            console.log("Got user")
                        }
                        else {
                            // unauthorized....
                            res.status(401).send()
                            console.log("didnt get user")
                        }
                    })
            }

            else {
                res.status(401).send()
                console.log("didnt get token")
            }
        })
        //res.status(200).send();
       /* checkuId(req.headers.authorization).then(
            (doc, err) => {
                if (doc) {

                    console.log("Got token")
                    //200 means the  token is valid
                    res.status(200).send();

                }
                //it means that something is in the body ie the filled form
                //client side validation to be done separately

            }
        )*/
    }

    else
        if (Object.keys(req.body) != 0) {
    var userlogin = {};
    userlogin.emailId = req.body.loginEmail;
    userlogin.password = req.body.loginPassword;
    console.log("userlogin",userlogin)
   // var tokenobj = {};
                //    console.log(req.headers.authorization);
                // console.log("JHBGYBDTCY")
                 checkUserEmail( userlogin.emailId).then((userObj, err) => {
                    var tokenobj = {};
                   if (err) throw err;
                    console.log("userobj find", userObj);
                    console.log("IS PASSWORD MATCHING : ", validPassword(userlogin.password, userObj.password));

                    if (validPassword) {

                //         // console.log("header", req.headers.authorization);
                //         // if (req.headers.authorization) {
                        tokenobj.uId = userObj._id;
                        tokenobj.token = r.randomToken()
                        tokenobj.timestamp = new Date().getTime()
        
                        newToken(tokenobj).save(function (err, tokenOb) {
                            if (err) throw err
                            console.log("token SAVE SUCCESSFUL for new login user")
                            res.status(200).send({ authtoken: tokenOb.token });
                        })
                      /*  checkuId(tokenobj.uId).then((tokenOb, err) => {
                            console.log("tokenobject", tokenOb)
                            if (err) throw err;
                             res.status(200).send({ authtoken: tokenOb.token });
                         })*/
                    }
                    else{
                        res.status(401).send({error:"please enter valid emailid or password"})
                    }
                })
            }

           /* else if (req.headers.authorization != 'null') {
                    console.log("loginuser token already exist so redirect to dashboard with token", req.headers.authorization);
                    res.status(200).send();
                  /*  checkuId(req.headers.authorization).then(
                        (tokenOb, err) => {
                            if (tokenOb) {
                                console.log("Got token")
                                res.status(200).send();
                            }
                            else{
                                res.status(401).send({error:"please enter valid emailid or password"})
                            }
                        }
                    )
                
            
            }*/
        })

        /*-----------------for logout--------------*/
      
        app.post('/logout', function (req, res) {
            console.log(req.body);
            console.log("tokenloggg",req.headers.authorization);
          //  console.log("LOGGED OUT");
          deleteUserToken(req.headers.authorization).then((tokendoc,err)=>{
           // if (!tokendoc) {res.status(404).send({message:"token not found "})}
           console.log("tokenobject", tokendoc)
           if (err) throw err;
      res.status(200).send({message: "token deleted successfully!"});
        
     })
          //  res.json({ redirect: '/', message: 'OK' });
        })
/*---------------------------add title ------------------------*/
app.post('/addnotetitle',tokenCheckingMiddleware, function (req, res) {
    // console.log("req", req.body);
    insertTitle('5b0bc831ccfade2af940e156', req.body.title)
        .then(function (doc, err) {   //returns the inserted document
            if (err) throw err
            console.log("doc", doc);
        })
})


//get all the titles of a specific user - read/retrieve operation
app.get('/gettitles',tokenCheckingMiddleware, function (req, res, next) {
    // console.log("req", req.body);
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
app.post('/addnotecontent',tokenCheckingMiddleware, function (req, res) {
    // console.log("reqofcontent", req.body);
    insertNoteContent('5b0bc831ccfade2af940e156', req.body.content, req.body.isChecked)
        .then(function (doc, err) {   //returns the inserted Content document
            if (err) throw err
            console.log("content doc", doc);
        })
    // console.log("fd");
});




/*-----------test-----------*/
app.post('/test', function (req, res, next) {
    console.log("HEUIBHNJhnu")
    passport.authenticate('localStrategy',
        {
            session: false
        },
        function (err, user, info) {
            console.log(" err : ", err)
            console.log("user : ", user)
            console.log(" info : ", info)
        })(req, res, next);
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

    /* notesTitleArray.map((noteTitle, titleIndex) => {
                    //create a new entry with the title and _id
                    
                    objToSend.push({ _id: noteTitle._id, title: noteTitle.title, date : noteTitle.date })
                    
                })*/
