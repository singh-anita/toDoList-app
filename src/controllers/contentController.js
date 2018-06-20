const contentTable = require('../models/noteModel');

/*Create and Save a new Content----->------adding new Content------------------*/
exports.addNewContent= function (req, res) {

     var user = res.locals.user;
    //  if (user) {
        contentTable({ notesID: req.body.titleid, content:  req.body.content, isChecked: req.body.isChecked }).save()
         .then((notecontent) => {
         console.log(notecontent)
             res.status(200).send(notecontent);
         })
         .catch((err)=>{
            res.status(400).send({ error: err, message: "Some Error occured " }); 
        })
    //  }
    //  else {
    //      console.log("Unauthorized user")
    //      res.status(401).send({ error: "content not inserted" });
    //  }
 
 }