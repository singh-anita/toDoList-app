if (req.headers.authorization == "null" && !(req.body == '{}')) {
    var userdata = {};
  
    userdata.emailId = req.body.email;
    userdata.username = req.body.username;
    // console.log("PWD : ", bcrypt.hashSync("pwd", saltRounds))
    userdata.password = bcrypt.hashSync(req.body.password, saltRounds);/*Store hash in your password DB.*/



    console.log("HJGFNJDFBYTFTYU : ", userdata)
    newUser(userdata).save(function (err, data) {
        if (err) throw err
        console.log("SAVE SUCCESSFUL")

        // var obj = {}
        tokendata.uId = data._id;
        tokendata.token = r.randomToken()
        tokendata.timestamp = new Date().getTime()

        newToken(tokendata).save(function (err, data) {
            if (err) throw err
            console.log("token SAVE SUCCESSFUL")
            res.send({ authtoken: tokendata.token, redirect: '/' });
        })

    })
} else{

    console.log("dsfgvhyfvui")
    checkuId(req.headers.authorization).then((tokendata, err) => {

        if (err) throw err;

        console.log("tok", tokendata)

        res.json({ redirect: '/' })
        // }

    })

}