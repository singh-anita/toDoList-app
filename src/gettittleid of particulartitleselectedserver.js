

/*----------------get titleid of particular note-------------------*/
app.get('/getnotecontent/:id',tokenCheckingMiddleware, function (req, res, next) {
    // console.log("req", req.headers);
    console.log("reqnote", req.params);
     console.log("Users coming",res.locals.user)
     var user= res.locals.user;
     //if(user){
      //  req.params.id.find((arr, idx) => {
       //     if(arr._id === key){
      //          console.log("arr HERE : ", arr)
      //          return arr 
      //      }
  // var titleToSend =[];
  /*  getNotesTitle(user._id)
    .then((notesTitleArray, err1) => {
       //  console.log("singleNoteEntry : ", notesTitleArray)
        notesTitleArray.map((noteTitle, titleIndex) => {
            //create a new entry with the title and _id
            titleToSend[titleIndex] = { _id: noteTitle._id, title: noteTitle.title }
         */
         if(user){
        var  contentToSend=[]
     getAllContentofNote(req.params.id).then((NoteContents, err)=>{
       
         console.log("content",NoteContents)
         //if (err) throw err
           NoteContents.map((individualTitleentry, noteContentIdx) => {
                contentToSend.push( {id:individualTitleentry._id  ,content: individualTitleentry.content, isChecked: individualTitleentry.isChecked }
            )
        })
          res.status(200).send(contentToSend);

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
