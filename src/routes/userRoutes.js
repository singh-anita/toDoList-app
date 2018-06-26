module.exports = (app) => {
    const user = require('../controllers/userController');
    var  tokenChecking  = require('../functionality/tokenCheckingmw');
    // Create a new User
    app.post('/signup', user.addNewUser);
    app.post('/login',user.userLogin);
    app.post('/logout', user.logout);
    //  app.post('/dashboard', tokenChecking.tokenCheckingMiddleware);
}
