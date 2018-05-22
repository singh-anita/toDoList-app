var bcrypt = require('bcrypt');
//const myPlaintextPassword = 's0/\/\P4$$w0rD';
//const someOtherPlaintextPassword = 'not_bacon';
exports.hashpass = function (password, saltRounds) {
    var hash = bcrypt.hashSync(password, saltRounds);
    //console.log(hash);
    return hash;
}
