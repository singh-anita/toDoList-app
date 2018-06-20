module.exports = (app) => {
    const content = require('../controllers/contentController');
    var  tokenChecking  = require('../functionality/tokenCheckingmw');
app.post('/addnotecontent', tokenChecking.tokenCheckingMiddleware,content.addNewContent);
}