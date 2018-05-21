var express = require('express'); // call express
var app = express();  // define our app using express
var bodyparser = require("body-parser");
var { newUser } =require('./models/user');
//var db ='mongodb://localhost/test';
//mongoose.connect(db); // connect to our database
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({extended: true}))

// FOR SIGN UP - create user accounts
app.post('/signup', function (req, res) {
    var userdata = {};
     userdata.emailId =req.body.email;
     userdata.username = req.body.username;
    userdata.password = req.body.password;

console.log("user obj created " ,userdata);
 //   var email=req.body.email;
  //  var username=req.body.username;
  //  var password=req.body.password;
  //  var confpassword=req.body.confpassword;
   // console.log(req.body)
   newUser(userdata).save(function(err,d){
    //send this error in a fancy way back to the app
    if(err) throw err
    else {
        console.log("INSERT SUCCESSFUL")
       // return res.redirect('/profile');
      }
});

    /*newUser(userdata).then(x => console.log("INSERT SUCCESSFUL")).catch(err => {
        res.status(400).send("unable to save to database");
        });*/
    
});

app.post('/', function (req, res) {
    console.log(req.body)
})
app.listen(3001);
