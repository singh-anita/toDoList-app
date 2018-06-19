       // test a matching password
       users.comparePassword(password, function(err, isMatch) {
        if (err) throw err;
       console.log("checking password match",password, isMatch); // -> Password123: true
      });