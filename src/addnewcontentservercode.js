/*---------------------------adding new Content--------------------------*/
app.post('/addnotecontent',tokenCheckingMiddleware, function (req, res) {
    console.log("reqofcontent", req.body);
    console.log("reqofcontent", req.body.titleid);
   console.log("Users coming",res.locals.user)
   var user =res.locals.user;
   if(user){
      // var titleIdToSend = [];
      // getNotesTitle(user._id)
    //   .then((noteTitles, err) => {
        //   if (err) throw err
    
     //  noteTitles.map((note,idx) => {
         //  console.log('singlenote',note)
       //  if(req.body.id)
        // {
           insertNoteContent(req.body.titleid, req.body.content, req.body.isChecked).then((notecontent,err)=>{
             console.log(notecontent)
             if (err) throw err
             res.status(200).send();
           })
       //}
          // res.status(200).send(titleIdToSend);

     //  })
  // })
}
   else {
            console.log("Unauthorized user")
       res.status(401).send({error:"content not inserted"});
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
