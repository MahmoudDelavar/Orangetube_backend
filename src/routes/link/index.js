const express = require("express");
const multer = require("multer");
const router = express.Router();
const controller = require("./controller");

//-----------------------------------------

router.post("/", controller.addlink);

//------------------------------------------
module.exports = router;
