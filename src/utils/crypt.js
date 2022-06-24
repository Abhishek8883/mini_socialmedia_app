const bcrypt = require("bcryptjs");

exports.comparepassword = (password, dbpassword) => {
    return bcrypt.compareSync(password, dbpassword);
};