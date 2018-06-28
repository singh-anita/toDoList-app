module.exports = (app) => {
    const attatchment = require('../controllers/noteAttachmentController');
    var  tokenChecking  = require('../functionality/tokenCheckingmw');
app.post('/fileupload/:notesId', tokenChecking.tokenCheckingMiddleware,attatchment.uploadImageFile);
//app.get('getFilesImg/:notesId',tokenChecking.tokenCheckingMiddleware,attatchment.getImageFile);
}
//attatchment.upload