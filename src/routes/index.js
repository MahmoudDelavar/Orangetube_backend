const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const storeroomRouter = require("./storeroom");
router.use("/auth", authRouter);
router.use("/storeroom", storeroomRouter);
module.exports = router;
