module.exports = (app) => {
    const user = require('../controllers/userController');

     // Create a new User
    app.post('/signup', user.addNewUser);

    // Retrieve all Users

    // app.get("/signup", user.siguprelated);

   // app.post('/login', user.userLogin);

  //  app.get("/dashboard", user.dashboard);

  //  app.get("/logout", user.logout);

}
