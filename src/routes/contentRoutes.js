module.exports = (app) => {
    const content = require('../controllers/contentController');
    var  tokenChecking  = require('../functionality/tokenCheckingmw');
     // Create a new Content
app.post('/addnotecontent', tokenChecking.tokenCheckingMiddleware,content.addNewContent);
 // Retrieve all contents with  noteId of particular note
 app.get('/getnotecontent/:id', tokenChecking.tokenCheckingMiddleware,content.getNoteAllContent);
 // Update a Note
 app.put('/updatenotecontent', tokenChecking.tokenCheckingMiddleware,content.updateNoteContent);
 app.delete('/deletenotecontent/:id',tokenChecking.tokenCheckingMiddleware,content.deleteNoteContent);
 app.put('/checkStateChange/:id',tokenChecking.tokenCheckingMiddleware, content.contentChecked);
}