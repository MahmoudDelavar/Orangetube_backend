const winston = require("winston");
//-----------------------------------------
module.exports = (err, req, res, next) => {
  const winston = require("winston");
  winston.error(err.message.err);
  res.status(500).json({ message: "Server Error" });
};
