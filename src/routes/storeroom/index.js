const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { storeroomValidator } = require("./validator");
//-----------------------------------------

router.post(
  "/",
  storeroomValidator(),
  controller.validate,
  controller.storeroom
);
//------------------------------------------

module.exports = router;
