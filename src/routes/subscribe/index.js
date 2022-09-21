const express = require("express");
const multer = require("multer");
const router = express.Router();
const controller = require("./controller");

//-----------------------------------------

router.post("/isSubscribe", controller.isSubscribe);
router.post("/subscribe", controller.subscribe);
router.post("/unsubscribe", controller.unsubscribe);
router.post("/subscribeNumber", controller.subscribeNumber);
router.post("/subscribtions", controller.subscribtions);

//------------------------------------------
module.exports = router;
