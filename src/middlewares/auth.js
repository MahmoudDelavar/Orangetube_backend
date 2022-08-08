const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("./../models/user");

//--------------------------------------------
async function isLoggined(req, res, next) {
  const token = req.header("token");

  if (!token) {
    res.status(400).send("acsecc denied");
    return;
  }
  try {
    const decoded = jwt.verify(token, config.get("jwt_key"));
    const user = await User.findById(decoded._id);
    req.user = user;
    next();
  } catch (ex) {
    res.status(400).send("invalid token");
  }
}

module.exports = { isLoggined };
