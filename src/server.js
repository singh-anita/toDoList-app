var express = require('express'); // call express
var app = express();  /* define our app using express*/
var bodyParser = require("body-parser");


//global.salt = "$2b$20$qnRfTkFUVT1CEjzZkjMmGu";
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json());


// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your users." });
});

// Require Users routes
require('./routes/userRoutes.js')(app);
// Require Notes routes
require('./routes/noteRoutes')(app);
// Require content routes
require('./routes/contentRoutes')(app);
require('./routes/noteAttachmentRoutes')(app);
// listen for requests
app.listen(3001, () => {
    console.log("Server is listening on port 3001");
});