const express = require("express");
const multer = require("multer");
const router = express.Router();
const controller = require("./controller");

//-----------------------------------------

router.post("/addComment", controller.addComment);
router.post("/getComments", controller.getComments);

//------------------------------------------
module.exports = router;
