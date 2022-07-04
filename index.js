const express = require("express");
const mongoose = require("mongoose");
const debug = require("debug")("app:main");
const dbdebug = require("debug")("app:db");
const config = require("config");
const router = require("./src/routes");
const bodyParser = require("body-parser");
const cors = require("cors");
//-----------------------------------
const app = express();

//-----------------------------------
app.use(express.json());
// app.use(cors({ origin: true }));
// app.use(cors({ headers: true }));
// app.use(cors({ methods: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());

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

//-----------------------------------

app.use("/api", router);
const PORT = config.get("PORT");
app.listen(PORT, () => debug(`Listening on PORT: ${PORT}`));
