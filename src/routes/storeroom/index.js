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
router.get("/all", controller.getAllProducts);
router.get("/edit", controller.getProduct);

router.put("/", controller.updateProduct);
//------------------------------------------

module.exports = router;
