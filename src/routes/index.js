const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const storeroomRouter = require("./storeroom");
const vidoeRouter = require("./videos");
const ScubscribeRouter = require("./subscribe");
const { isLoggined } = require("./../middlewares/auth");
const error = require("./../middlewares/error");

router.use("/auth", authRouter);
router.use("/storeroom", storeroomRouter);
router.use("/videos", vidoeRouter);
router.use("/subscribe", ScubscribeRouter);

router.use(error);
module.exports = router;
