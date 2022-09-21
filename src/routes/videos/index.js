const express = require("express");
const multer = require("multer");
const router = express.Router();
const controller = require("./controller");
const { storeroomValidator } = require("./validator");
//-----------------------------------------

router.post("/load", controller.loadVideo);
router.post("/thumbnail", controller.thumbnailVideo);
router.post("/addvideo", controller.addVideo);
router.get("/allVideos", controller.allVidos);
router.post("/getVideo", controller.getVideo);

//------------------------------------------
module.exports = router;
