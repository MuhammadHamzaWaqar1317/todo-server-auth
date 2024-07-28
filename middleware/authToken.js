const jwt = require("jsonwebtoken");

const constant = require("../constant/constant");

const authToken = (req, res, next) => {
  console.log("in middleware");
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    console.log(authHeader);
    const decoded = jwt.verify(token, constant.jwtSecret);
    const { email } = decoded;
    res.locals.email = email;
    next();
  } catch (err) {
    console.log("middleware err", err);
    res.status(404).send(err);
  }
};

module.exports = authToken;
