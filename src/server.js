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

app.post('/', function (req, res) {
    var userInsObject = {};
     userInsObject.emailId =req.body.email;
     userInsObject.username = req.body.username;
    userInsObject.password = req.body.password;

console.log("user obj created " , userInsObject);
 //   var email=req.body.email;
  //  var username=req.body.username;
  //  var password=req.body.password;
  //  var confpassword=req.body.confpassword;
   // console.log(req.body)

    newUser(userInsObject).then(x => console.log("INSERT SUCCESSFUL"));
    
})
app.listen(8001);
