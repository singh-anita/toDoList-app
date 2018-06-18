var express = require('express'); // call express
var app = express();  /* define our app using express*/
var bodyparser = require("body-parser");
var { checkUserEmail, addnewUser, validPassword, newToken, getUId, getUserData, checkuId, deleteUserToken, insertTitle, getAllContentofNote, getNotesTitle, hashpass, insertNoteContent ,updateItems,removeNotesContent,updateTitles,deleteNotesTitle,getSingleTitle} = require('./models/userSchema');
const user = require('../controllers/usercontroller.js');
var r = require('./tokenGenerate');
//var passport = require('passport');
//var flash = require('connect-flash');
const saltRounds = 10;
var bcrypt = require('bcrypt');

//var LocalStrategy = require('passport-local').Strategy

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
    console.log("authorization of token", req.headers.authorization)
    console.log(req.headers.authorization)
    if (req.headers.authorization) {
        getUId(req.headers.authorization)
            .then((doc, err) => {
                if (doc) {
                    console.log("Got token")
                    getUserData(doc.uId)
                        .then((user, err) => {

                            if (user) {
                                res.locals.user = user;
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

app.post('/signup', user.addnewUser );

/*----- FOR SIGN UP - create user accounts-------*/
/*app.post('/signup', function (req, res) {

    if (req.headers.authorization != 'null') {
        console.log("user token already exist so redirect to dashboard with token", req.headers.authorization);
        console.log("HERTRERRR")
        checkuId(req.headers.authorization).then(
            (doc, err) => {
                if (doc) {

                    console.log("Got token")
                    res.status(200).send();

                }
              
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
            userdata.password = hashpass(req.body.password, saltRounds);//Store hash in your password DB.
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
                    setTimeout(() =>{ 
                        res.status(200).send({ authtoken: data.token });
                     }, 5000)
                    
                    
                })

            })
        }

});
*/
app.post('/login', function (req, res) {
    // if (req.headers.authorization ){
    var userlogin = {};
    userlogin.emailId = req.body.loginEmail;
    userlogin.password = req.body.loginPassword;
    console.log("userlogin", userlogin)
    // var tokenobj = {};
    checkUserEmail(userlogin.emailId).then((userObj, err) => {
        var tokenobj = {};
        if (err) throw err;
        console.log("userobj find", userObj);
        console.log("IS PASSWORD MATCHING : ", validPassword(userlogin.password, userObj.password));

       if (validPassword(userlogin.password, userObj.password)) {
            tokenobj.uId = userObj._id;
            tokenobj.token = r.randomToken()
            tokenobj.timestamp = new Date().getTime()

            newToken(tokenobj).save(function (err, tokenOb) {
                if (err) throw err
                console.log("token SAVE SUCCESSFUL for new login user")
                res.status(200).send({ authtoken: tokenOb.token });
            })
        }
        else {
            res.status(401).send({ error: "please enter valid password" })
        }
  })
// }
})
/*---------------------FOR login---------------------------*/
/*app.post('/login', function (req, res) {
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
    /*}

    else
        if (Object.keys(req.body) != 0) {
            var userlogin = {};
            userlogin.emailId = req.body.loginEmail;
            userlogin.password = req.body.loginPassword;
            console.log("userlogin", userlogin)
            // var tokenobj = {};
            checkUserEmail(userlogin.emailId).then((userObj, err) => {
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
                }
                else {
                    res.status(401).send({ error: "please enter valid emailid or password" })
                }
            })
        }
})*/

/*-----------------for logout--------------*/

app.post('/logout', function (req, res) {
    console.log(req.body);
    console.log("tokenloggg", req.headers.authorization);
    deleteUserToken(req.headers.authorization).then((tokendoc, err) => {
        // if (!tokendoc) {res.status(404).send({message:"token not found "})}
        console.log("tokenobject", tokendoc)
        if (err) throw err;
        res.status(200).send({ message: "token deleted successfully!" });
    })
})
/*---------------------------adding new title -------------------------*/
app.post('/addnotetitle', tokenCheckingMiddleware, function (req, res, next) {
    console.log("req", req.body.title);
    console.log("Users coming", res.locals.user._id)
    var user = res.locals.user;
    if (user) {
        insertTitle(user._id, req.body.title).then((doc, err) => {   //returns the inserted document
            if (err) throw err
            console.log("doc", doc);
            res.status(200).send(doc);
        })
    }
    else {
        res.status(401).send({ error: "title not inserted" });
    }
})
/*get all the titles of a specific user -->read/retrieve */
app.get('/gettitles', tokenCheckingMiddleware, function (req, res, next) {
    // console.log("req", req.headers);
    // console.log("Users coming",res.locals.user._id)
    var user = res.locals.user;
    if (user) {
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
        res.status(401).send({ error: "Unauthorized user" });
    }
})

/*---------------------------updating title--------------------------*/
app.post('/updatenotetitle', tokenCheckingMiddleware, function (req, res, next) {
    console.log("reqofupdatetitle", req.body);
    // console.log("reqofcontent", req.body.titleid);
    console.log("Users coming", res.locals.user)
    var user = res.locals.user;
   if (user) {
        updateTitles(req.body.titleId, req.body.title).then((updatedoc, err) => {
            console.log("doc",updatedoc)
            if (err) throw err
            res.status(200).send(updatedoc);
        })
    }
    else {
        console.log("Unauthorized user")
        res.status(401).send({ error: "content not updated" });
    }

});


/*---------------------------deleting the title---------------------------------------------------*/
app.delete('/deletenotetitle/:id', tokenCheckingMiddleware, function (req, res, next) {
    // console.log("dddd")
     console.log("reqofdeleteetitle", req.params);
    console.log("Users coming", res.locals.user)
     var user = res.locals.user;
     var titlesToSend = []
    if (user) {
        deleteNotesTitle(req.params.id).then((deleteTitle, err) => {
             console.log("doc",deleteTitle)
             getNotesTitle(deleteTitle.uId).then((NoteTitles, err) => {
                 // console.log("content", NoteContents)
                 titlesToSend = NoteTitles.map((note) => {
                   return { _id: note._id, title: note.title ,deletedAt:note.deletedAt}
                  //return note
                })

                  // console.log("sending", contentToSend)
                 res.status(200).send(titlesToSend);
             })
         if (err) throw err
            // res.status(200).send({message:"successfully deleted"});*/
      })
     }
     else {
         console.log("content not deleted")
         res.status(401).send({ error: "content not deleted" });
     }
 
 });
/*----------------get contents basedon titleid of particular note-------------------*/
app.get('/getnotecontent/:id', tokenCheckingMiddleware, function (req, res, next) {
    // console.log("req", req.headers);
  // console.log("reqnoteconetnt", req.params);
   // console.log("Users coming", res.locals.user)
    var user = res.locals.user;
    if (user) {
        var objToSend = {
            note_title : '',
            entries : []
        }
    getSingleTitle(req.params.id).then((notesobj,err) =>{
      //  console.log(titles)
        objToSend.note_title=notesobj.title;

        getAllContentofNote(req.params.id).then((NoteContents, err) => {
           
            // console.log("content", NoteContents)
            //if (err) throw err
            NoteContents.map((individualTitleentry, noteContentIdx) => {
                objToSend.entries.push({ id: individualTitleentry._id, content: individualTitleentry.content, isChecked: individualTitleentry.isChecked }
                )
                  console.log("sending : ", individualTitleentry)
            })
            console.log("drftre",objToSend)
            res.status(200).send(objToSend);

        })
        // console.log("drftdfgdse",objToSend)
       // res.status(200).send(objToSend);
    })
  
       
    }
    else {
        console.log("content not deleted")
        res.status(401).send({ error: "not able to get id" });
    }
})

/*---------------------------adding new Content--------------------------*/
app.post('/addnotecontent', tokenCheckingMiddleware, function (req, res, next) {
   // console.log("reqofaddingcontent", req.body);
    // console.log("reqofcontent", req.body.titleid);
    //console.log("Users coming", res.locals.user)
    var user = res.locals.user;
    if (user) {
        insertNoteContent(req.body.titleid, req.body.content, req.body.isChecked).then((notecontent, err) => {
            // console.log(notecontent)
            if (err) throw err
            res.status(200).send(notecontent);
        })

    }
    else {
        console.log("Unauthorized user")
        res.status(401).send({ error: "content not inserted" });
    }

});

/*---------------------------updating new Content--------------------------*/
app.post('/updatenotecontent', tokenCheckingMiddleware, function (req, res, next) {
    console.log("sdfdasfdsfdsfdsf")
    console.log("reqofupdatecontent", req.body);
    // console.log("reqofcontent", req.body.titleid);
    console.log("Users coming", res.locals.user)
    var user = res.locals.user;
    if (user) {
        updateItems(req.body.contentId, req.body.content, req.body.isChecked).then((updatecontent, err) => {
            console.log("doc",updatecontent)
            if (err) throw err
            res.status(200).send(updatecontent);
        })
    }
    else {
        console.log("Unauthorized user")
        res.status(401).send({ error: "content not updated" });
    }
});

/*-----------updating checkbox-------*/
app.post('/checkStateChange', tokenCheckingMiddleware, function (req, res, next) {
    console.log("reqofupdatecheckbox", req.body);
    // console.log("reqofcontent", req.body.titleid);
    console.log("Users coming", res.locals.user)
    var user = res.locals.user;
  /*  if (user) {
        updateItems(req.body.contentId, req.body.content, req.body.isChecked).then((updatecontent, err) => {
            console.log("doc",updatecontent)
            if (err) throw err
            res.status(200).send(updatecontent);
        })
    }
    else {
        console.log("Unauthorized user")
        res.status(401).send({ error: "content not updated" });
    }*/
});

/*---------------------------deleting the content---------------------------------------------------*/
app.delete('/deletenotecontent/:id', tokenCheckingMiddleware, function (req, res, next) {
   // console.log("dddd")
   // console.log("reqofdeletecontent", req.params);
  //  console.log("Users coming", res.locals.user)
    var user = res.locals.user;
    var contentToSend = []
    if (user) {
        removeNotesContent(req.params.id).then((deletecontent, err) => {
            console.log("doc",deletecontent)
            getAllContentofNote(deletecontent.notesID).then((NoteContents, err) => {
                // console.log("content", NoteContents)
                NoteContents.map((individualTitleentry, noteContentIdx) => {
                    contentToSend.push({ id: individualTitleentry._id, content: individualTitleentry.content, isChecked: individualTitleentry.isChecked }
                    )
                })
                 // console.log("sending", contentToSend)
                res.status(200).send(contentToSend);
            })
           // if (err) throw err
           // res.status(200).send({message:"successfully deleted"});
        })
    }
    else {
        console.log("content not deleted")
        res.status(401).send({ error: "content not deleted" });
    }

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
