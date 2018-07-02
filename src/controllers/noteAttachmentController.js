const AttachmentCollection = require('../models/noteAttachmentModel');
const path = require('path');
const multer = require('multer');
const uuidv4 = require('uuid/v4');

// configure storage
//create a storage which says where and how the files/images should be saved.
const storage = multer.diskStorage({
    //destination	: The folder to which the file has been saved.
    destination: (req, file, cb) => {
        cb(null, '../images');
    },
    // filename	: The name of the file within the destination.
    filename: (req, file, cb) => {

        let imageId = uuidv4();

        const newFilename = `${imageId}${file.originalname}`;
        console.log('old file name', file)
        console.log('new file name', newFilename)
        console.log('imageid', imageId)
        console.log('mimetype', file.mimetype)
        //console.log("userid",res.locals.user)

        // console.log("user",res.locals.user.id)
        /*  let fileObj = {
              imageId: imageId,
              uId: req.user.id,
              notesID: req.params.notesId,
              originalName: file.originalname,
              savedName: newFilename,
              mimeType: file.mimetype
          }
          // let fileObj = new noteAttachmentModel(fileObjDatabase);
          AttachmentCollection.create(fileObj);//createFiles*/
        cb(null, newFilename);//error and givenewfilename parameters for callback
    }
});

// create the multer instance that will be used to upload/save the file--->
// Function to upload project images
exports.upload = multer({ storage: storage }).array('imgUploader');//Field name

//exports.
exports.uploadImageFile = (req, res) => {

    console.log('req param notesid here-', req.params.notesId)


    // upload(req, res, function (err) {
    // console.log('user id comin from tokenchecking middleware', req.files[0].filename);
    //   if (err) throw err
    var imgSend = [];
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
                    doc.map((img)=>{
                    imgSend.push({id:img.id, imageId: img.imageId, savedName: img.savedName})
                    })
                    // res.status(200).send({message:doc});
                })
                .catch((err) => {
                    res.status(400).send({ error: err, message: "Some Error occured " });
                })
        })
    res.status(200).send({message: imgSend});
    // })

}

exports.getImageFile= (req,res) => {
    console.log('get req param notesid here-', req.params.notesId)

   // console.log('user id comin from tokenchecking middleware', req.user.id)
    var imageToSend = [];
       AttachmentCollection.find({ notesID:  req.params.notesId })
                    .then(
                        (imageDoc) => {
                            console.log('image doc coming', imageDoc)
                            imageDoc.map((image) => {
                                imageToSend.push({id:image.id, imageId: image.imageId, savedName: image.savedName });
                            })

                            return res.status(200).json({ message: imageToSend })
                        }
                    )
}

/*db.findImageContent(req.params.notesId)
.then(
    imageDoc => {
        console.log('imge doc here => #########################3333333333', imageDoc)

        return res.status(200).json({ message: doc, message1: notesTitle, message2: imageDoc })
    }
)*/
/*  AttachmentCollection.find({ notesID:  req.params.notesId })
        .then(
           (imageDoc) => {

                console.log('imagedoc here -', imageDoc)
                return res.status(200).json({ message: imageDoc })
            }

        )
        .catch(
            (err) => {
                return res.status(400).json({ message: err })
            }
        )*/