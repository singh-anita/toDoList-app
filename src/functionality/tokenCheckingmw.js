var Token = require('../models/tokenModel');
const User = require('../models/userModel');
exports.tokenCheckingMiddleware = function (req, res,next) {
    console.log("mw authorization of token", req.headers.authorization)
    //  if (req.headers.authorization) {
    Token.findOne({ token: req.headers.authorization })
        .then((doc) => {
            if (doc) {
                console.log("Got token")
                User.findOne({ _id: doc.uId })
                    .then((user) => {
                        if (user) {
                            console.log("Got user", user)
                           // res.status(200).send({ message: 'Got user' });
                            res.locals.user = user;
                            next();
             
                        }
                       
                    })
                    .catch((err) => {
                        res.status(409).send({ error: err, message: "didnt get user" });
                        console.log("didnt get user")

                    })
            }
            else{
                res.status(401).send()
            }
        })
    //  }
}