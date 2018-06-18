/*for database connection*/
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.createConnection("mongodb://localhost/todoapp")
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log(err);
    process.exit();
});

