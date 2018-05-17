var express = require('express');
var app = express();
var bodyparser = require("body-parser");
var User =require('./user.model');
var db ='mongodb://localhost/test';
mongoose.connect(db);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({extended: true}))

app.post('/', function (req, res) {
    console.log(req.body)

})
app.listen(8001);
