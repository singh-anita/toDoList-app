var express = require('express'); // call express
var app = express();  /* define our app using express*/
var bodyparser = require("body-parser");
var { checkUserEmail, newUser, validPassword, newToken, getUId, getUserData, checkuId,deleteUserToken, insertTitle,getAllContentofNote, getNotesTitle, hashpass, insertNoteContent } = require('./models/user');
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

// app.use(tokenCheckingMiddleware())


function tokenCheckingMiddleware(req, res, next) {
console.log("hello m here")
console.log("tokench",req.headers.authorization)
console.log(req.headers.authorization)
    if (req.headers.authorization) {
        getUId(req.headers.authorization)
            .then((doc, err) => {
                if (doc) {
                    console.log("Got token")
                    getUserData(doc.uId)
                        .then((user, err) => {

                            if (user) {
                                res.locals.user=user;
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
       /* checkuId(req.headers.authorization).then(
            (doc, err) => {
                if (doc) {

                    console.log("Got token")
                    //200 means the  token is valid
                    res.status(200).send();

                }
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
                 checkUserEmail( userlogin.emailId).then((userObj, err) => {
                    var tokenobj = {};
                   if (err) throw err;
                    console.log("userobj find", userObj);
                    console.log("IS PASSWORD MATCHING : ", validPassword(userlogin.password, userObj.password));

                    if (validPassword) {
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
/*---------------------------adding new title -------------------------*/
app.post('/addnotetitle',tokenCheckingMiddleware, function (req, res,next) {
    console.log("req", req.body.title);
    console.log("Users coming",res.locals.user._id)
    var user =res.locals.user;
   // console.log( "users coming",user )
    if(user){
        insertTitle(user._id, req.body.title).then((doc, err) => {   //returns the inserted document
            if (err) throw err
            console.log("doc", doc);
        })
   }
   else {
    res.status(401).send({error:"title not inserted"});
}
})


/*get all the titles of a specific user -->read/retrieve */
app.get('/gettitles',tokenCheckingMiddleware, function (req, res, next) {
    // console.log("req", req.headers);
    // console.log("Users coming",res.locals.user._id)
     var user =res.locals.user;
     if(user){
    var titleToSend = [];

  getNotesTitle(user._id)
        .then((noteTitles, err) => {
            if (err) throw err
          //  console.log("notestitleobj",noteTitles)
            /*---array of notetitles objects came so to get specific title map*/
            titleToSend = noteTitles.map((note) => {
                return { _id: note._id, title: note.title }
            })

            res.status(200).send(titleToSend);

        })
    }
    else {
             console.log("Unauthorized user")
        res.status(401).send({error:"title not inserted"});
    }
})

/*----------------get titleid of particular note-------------------*/
app.get('/getnotecontent/:id',tokenCheckingMiddleware, function (req, res, next) {
    // console.log("req", req.headers);
    console.log("reqnote", req.params.id);
     console.log("Users coming",res.locals.user)
     var user= res.locals.user;
     if(user){
   var contentToSend =[];
    //{ _id: req.params}
    getNotesTitle(user._id)
    .then((notesTitleArray, err1) => {
        // console.log("singleNoteEntry : ", notesTitleArray)
        notesTitleArray.map((noteTitle, titleIndex) => {
            //create a new entry with the title and _id
            contentToSend[titleIndex] = { _id: noteTitle._id, title: noteTitle.title, list: [] }
     getAllContentofNote( noteTitle._id).then((NoteContents, err)=>{
       
         console.log("content",NoteContents)
         //if (err) throw err
      // NoteContents.map((individualTitleentry, noteContentIdx) => {
            NoteContents.map((individualTitleentry, noteContentIdx) => {
                contentToSend[titleIndex].list.push( {  content: individualTitleentry.content, isChecked: individualTitleentry.isChecked }
            )
        })
         //  res.status(200).send(contentToSend);

     })
    })
})
     }
    })
    // var user =res.locals.user;
   /*  if(user){
    var titleIdToSend = [];

  getNotesTitle(user._id)
        .then((noteTitles, err) => {
            if (err) throw err
            console.log("notestitleobj",noteTitles)
           
            titleToSend = noteTitles.map((note) => {
                return { _id: note._id, title: note.title }
            })

            res.status(200).send(titleToSend);

        })
    }
    else {
             console.log("Unauthorized user")
        res.status(401).send({error:"title not inserted"});
    }*/



/*---------------------------adding new Content--------------------------*/
app.post('/addnotecontent',tokenCheckingMiddleware, function (req, res) {
     console.log("reqofcontent", req.body);
    console.log("Users coming",res.locals.user)
    var user =res.locals.user;
    if(user){
       // var titleIdToSend = [];
        getNotesTitle(user._id)
        .then((noteTitles, err) => {
            if (err) throw err
     
       /*    noteTitles.map((note,idx) => {
            insertNoteContent(note._id, req.body.content, req.body.isChecked)
        
            })*/

            res.status(200).send(titleIdToSend);

        })
    }
    else {
             console.log("Unauthorized user")
        res.status(401).send({error:"title not inserted"});
    }
   /* insertNoteContent(user._id, req.body.content, req.body.isChecked)
        .then(function (doc, err) {   //returns the inserted Content document
            if (err) throw err
            console.log("content doc", doc);
        })
    }
    else {
        console.log("Unauthorized user")
   res.status(401).send({error:"title not inserted"});
}*/
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
