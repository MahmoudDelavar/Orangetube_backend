const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { registerValidator, loginValidator } = require("./validator");
const loadUsers = require("../loadUsers/controller");
//-----------------------------------------

router.post(
  "/register",
  registerValidator(),
  controller.validate,
  controller.register
);
router.post("/login", loginValidator(), controller.validate, controller.login);

//------------------------------------------

module.exports = router;
