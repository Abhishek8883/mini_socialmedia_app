const bcrypt = require("bcryptjs");

exports.comparepassword = (password, dbpassword) => {
    return bcrypt.compareSync(password, dbpassword);
};

exports.hashpassword = (password) => {
    var hash = bcrypt.hashSync(password, 8);
    return hash
}