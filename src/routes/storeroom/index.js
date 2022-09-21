const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { storeroomValidator } = require("./validator");
//-----------------------------------------
router.post("/uploadPic", controller.uploadPic);
router.post(
  "/",
  storeroomValidator(),
  controller.validate,
  controller.addProduct
);

router.get("/", controller.getProducts);
router.get("/all", controller.getAllProducts);
router.get("/getOne", controller.getOneProduct);

router.put("/edit", controller.updateProduct);

router.delete("/deleteOne", controller.deleteOneProduct);
//------------------------------------------

module.exports = router;
