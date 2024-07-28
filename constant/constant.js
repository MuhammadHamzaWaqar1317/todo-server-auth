const bcrypt = require("bcryptjs");

exports.salt = bcrypt.genSaltSync(10);
exports.jwtSecret = "hamzaauth";
