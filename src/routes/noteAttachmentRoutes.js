module.exports = (app) => {
    const attatchment = require('../controllers/noteAttachmentController');
    var  tokenChecking  = require('../functionality/tokenCheckingmw');
app.post('/fileupload/:notesId', tokenChecking.tokenCheckingMiddleware,attatchment.upload,attatchment.uploadImageFile);
app.get('/getFilesImg/:notesId',attatchment.getImageFile);
     // delete a image with noteId
     app.delete('/deleteImage/:id',tokenChecking.tokenCheckingMiddleware, attatchment.deleteImageAttachemnt);
}
//attatchment.upload