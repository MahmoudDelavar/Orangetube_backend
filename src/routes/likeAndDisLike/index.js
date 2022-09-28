const express = require("express");
const router = express.Router();
const controller = require("./controller");
//------------------------------------------
router.post("/getLikedCount", controller.likedCount);
router.post("/getDisLikedCount", controller.disLikedCount);
router.post("/like", controller.like);
router.post("/unLike", controller.unLike);
router.post("/disLike", controller.disLike);
router.post("/unDisLike", controller.unDisLike);
//------------------------------------------

module.exports = router;
