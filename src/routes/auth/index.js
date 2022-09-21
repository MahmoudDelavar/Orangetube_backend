const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { registerValidator, loginValidator } = require("./validator");

//-----------------------------------------

router.post(
  "/register",
  registerValidator(),
  controller.validate,
  controller.register
);
router.post("/login", loginValidator(), controller.validate, controller.login);
router.post("/avatar", controller.loadAvatar);
router.post("/userbytoken", controller.userbytoken);
//------------------------------------------

module.exports = router;
