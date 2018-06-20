exports.tokenCheckingMiddleware=function(req, res) {
    console.log("authorization of token", req.headers.authorization)
    //console.log(req.headers.authorization)
  //  if (req.headers.authorization) {
    Token.findOne({ token : req.headers.authorization })
    .then((doc, err) => {
        if (doc) {
            console.log("Got token")
            User.findOne({ _id : doc.uId })
                .then((user, err) => {

                    if (user) {
                       // res.locals.user = user;
                        // next();
                        console.log("Got user",user)
                        res.status(200).send({ message: 'Got user'});
                    }
                    else {
                        // unauthorized....
                        res.status(401).send()
                        console.log("didnt get user")
                    }
                })
        }
    })
  //  }
}