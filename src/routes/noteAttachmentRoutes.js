module.exports = (app) => {
    const attatchment = require('../controllers/noteAttachmentController');
    var tokenChecking = require('../functionality/tokenCheckingmw');
    app.post('/fileupload/:notesId', tokenChecking.tokenCheckingMiddleware, attatchment.upload, attatchment.uploadImageFile);
    app.get('/getFilesImg/:notesId', attatchment.getImageFile);
    // delete a image with noteId
    app.delete('/deleteImage/:imageId', tokenChecking.tokenCheckingMiddleware, attatchment.deleteImageAttachemnt);
    app.get('/downloadImg/:savedName',attatchment.downloadImage);
  /*  app.get('/download', function(req, res){
        var file = __dirname + '/upload-folder/dramaticpenguin.MOV';
        res.download(file); // Set disposition and send it.
      });*/
}
// attatchment.downloadImage