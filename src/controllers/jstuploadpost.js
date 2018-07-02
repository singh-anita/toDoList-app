exports.uploadImageFile = (req, res) => {

    console.log('req param notesid here-', req.params.notesId)


    // upload(req, res, function (err) {
    // console.log('user id comin from tokenchecking middleware', req.files[0].filename);
    //   if (err) throw err
    let fileObj = {};
    fileObj.uId = req.user.id,
        fileObj.notesID = req.params.notesId,
        req.files.map((oneFile, idx) => {
            fileObj.imageId = oneFile.filename.slice(0, oneFile.filename.length - oneFile.originalname.length),

                fileObj.originalName = oneFile.originalname,
                fileObj.savedName = oneFile.filename,
                fileObj.mimeType = oneFile.mimetype

            // Save Note in the database
            AttachmentCollection(fileObj).save()
                .then((doc) => {   //returns the inserted document
                    console.log("fileObj doc", doc);
                })
                .catch((err) => {
                    res.status(400).send({ error: err, message: "Some Error occured " });
                })
        })
    res.status(200).send({message:"success"});
    // })

}