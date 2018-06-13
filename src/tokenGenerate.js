var crypto = require('crypto');

/*var randomToken = function(cb){
    var token;
 crypto.randomBytes(30, function(err, buffer) {
        token = buffer.toString('hex');
        cb(token)
      });
    
}*/
// exports.timestamp = new Date().getTime();

//exports.randomToken =randomToken;
exports.randomToken = function()
{
   return crypto.randomBytes(30).toString('hex');
}
