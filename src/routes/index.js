const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const storeroomRouter = require("./storeroom");
const { isLoggined } = require("./../middlewares/auth");
router.use("/auth", authRouter);
router.use("/storeroom", isLoggined, storeroomRouter);
module.exports = router;
