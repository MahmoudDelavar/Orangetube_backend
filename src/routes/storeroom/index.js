const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { storeroomValidator } = require("./validator");
//-----------------------------------------

router.post(
  "/",
  storeroomValidator(),
  controller.validate,
  controller.addProduct
);

router.get("/", controller.getProducts);
//------------------------------------------

module.exports = router;
