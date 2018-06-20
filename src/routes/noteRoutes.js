
module.exports = (app) => {
    const note = require('../controllers/noteController');
    var  tokenChecking  = require('../functionality/tokenCheckingmw');
   // Create a new Note
    app.post('/addnotetitle', tokenChecking.tokenCheckingMiddleware,note.addNewTitle);
   // Retrieve all Notes with userId
    app.get('/gettitles', tokenChecking.tokenCheckingMiddleware,note.getAllTitle);
    // Update a Note
    app.put('/updatenotetitle', tokenChecking.tokenCheckingMiddleware,note.updateTitle);
     // Update a Note with noteId
     app.delete('/deletenotetitle/:id',tokenChecking.tokenCheckingMiddleware,note.deleteTitle);
   
}