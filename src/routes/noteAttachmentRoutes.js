module.exports = (app) => {
    const attatchment = require('../controllers/noteAttachmentController');
    var  tokenChecking  = require('../functionality/tokenCheckingmw');
app.post('/fileupload/:notesId', tokenChecking.tokenCheckingMiddleware,attatchment.upload,attatchment.uploadImageFile);
app.get('/getFilesImg/:notesId',attatchment.getImageFile);
}
//attatchment.upload