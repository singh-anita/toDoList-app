const AttachmentCollection = require('../models/noteAttachmentModel');
const path = require('path');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const fs = require('fs');

// ####configure storage#####
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
        //     AttachmentCollection.create(fileObj);//createFiles*/
        cb(null, newFilename);//error and givenewfilename parameters for callback
    }
});

// create the multer instance that will be used to upload/save the file--->
// Function to upload project images
exports.upload = multer({ storage: storage }).array('imgUploader');//Field name

exports.uploadImageFile = (req, res) => {
    console.log('req param notesid here-', req.params.notesId)
    var imgSend = [];
    var allImgSend = [];
    console.log("files", req.files)
    if (req.files.length > 0) {
        req.files.map((oneFile, idx) => {
            let fileObj = {};
            fileObj.uId = req.user.id,
                fileObj.notesID = req.params.notesId,
                fileObj.imageId = oneFile.filename.slice(0, oneFile.filename.length - oneFile.originalname.length),
                fileObj.originalName = oneFile.originalname,
                fileObj.savedName = oneFile.filename,
                fileObj.mimeType = oneFile.mimetype
            imgSend.push(fileObj)
        })
        console.log("imgsend  array", imgSend)
        AttachmentCollection.insertMany(imgSend)
            .then((doc) => {   //returns the inserted document
                console.log("img doc", doc);
                doc.map((img) => {
                    allImgSend.push({ id: img.id, imageId: img.imageId, savedName: img.savedName,originalName :img.originalName})
                    //  console.log("imgsend",imgSend)
                })
                res.status(200).send({ message: allImgSend });
            })
            .catch((err) => {
                res.status(400).send({ error: err, message: "Some Error occured " });
            })
    }
}

exports.getImageFile = (req, res) => {
    console.log('get req param notesid here-', req.params.notesId)

    // console.log('user id comin from tokenchecking middleware', req.user.id)
    var imageToSend = [];
    AttachmentCollection.find({ notesID: req.params.notesId })
        .then(
            (imageDoc) => {
                console.log('image doc coming', imageDoc)
                imageDoc.map((image) => {
                    imageToSend.push({ id: image.id, imageId: image.imageId, savedName: image.savedName ,originalName:image.originalName });
                })

                return res.status(200).json({ message: imageToSend })
            }
        )
}

exports.deleteImageAttachemnt = (req, res) => {
    console.log("reqofdelete Image", req.params);
    var imagesToSend = [];
    AttachmentCollection.findOneAndRemove({ imageId: req.params.imageId })
        .then(
            (doc) => {
                console.log("image contents", doc);
                console.log("DFG", path.join(__dirname, '../..', 'images/') + doc.savedName);
                // console.log("DFG",__dirname +'/../images')
                fs.unlink(path.join(__dirname, '../..', 'images/') + doc.savedName, function (error) {
                    if (error) {
                        throw error;
                    }
                    console.log('Deleted image!!');
                })
                AttachmentCollection.find({ notesID: doc.notesID })// getAllContentofNote-->get all contents using titleid-
                    .then((images) => {
                        console.log("imgContents", images)
                        images.map((individualImageEntry, imageIndex) => {
                            imagesToSend.push({ id: individualImageEntry.id, imageId: individualImageEntry.imageId, savedName: individualImageEntry.savedName })
                        })
                        // console.log("sending", contentToSend)
                        res.status(200).send(imagesToSend);
                    })
                // return res.status(200).json({ message: doc })
            })
        .catch(
            (err) => {
                return res.status(400).json({ message: err })
            }
        )
}
exports.downloadImage = (req, res) => {
    // console.log("reqof body", req.body);
     console.log("reqof  download Image", req.params.savedName);
    var file = path.join(__dirname, '../..', 'images/') + req.params.savedName;
    res.download(file); // Set disposition and send it.
   // res.download(path.join(__dirname, '../..', 'images/') + req.params.savedName)
}