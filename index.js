require("express-async-errors");
const express = require("express");
var webpack = require("webpack");
const passport = require("passport");
const path = require("path");
const mongoose = require("mongoose");
const debug = require("debug")("app:main");
const dbdebug = require("debug")("app:db");
const config = require("config");
const router = require("./src/routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const winston = require("winston");
//-----------------------------------
const app = express();

//-----------------------------------
app.use(express.json({ limit: "15mb", extended: true }));
app.use(cors({ origin: true }));
app.use(cors({ headers: true }));
app.use(cors({ methods: true }));
app.use(
  express.urlencoded({ extended: true, limit: "15mb", parameterLimit: 150000 })
);
app.use("/public", express.static("public"));
app.use(bodyParser.json({ limit: "15mb", parameterLimit: 150000 }));

//-----------------------------------
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

//-----------------------------------
mongoose
  .connect(config.get("DB.address"))
  .then(() => dbdebug("Connected to database"))
  .catch((err) => dbdebug("Cant be Connetc:", err));

//-------------- handle Errors---------------------
process.on("uncaughtException", (ex) => {
  console.log("uncaught Exception - sync Error");
  winston.error(ex.message, ex);
});
process.on("unhandledRejection", (ex) => {
  console.log("unhandled Rejection - async Error");
  winston.error(ex.message, ex);
});
winston.add(new winston.transports.File({ filename: "logErrors.log" }));
//-----------------------------------
app.use("/api", router);
const PORT = config.get("PORT");
app.listen(PORT, () => debug(`Listening on PORT: ${PORT}`));
