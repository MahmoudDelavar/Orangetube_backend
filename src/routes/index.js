const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const storeroomRouter = require("./storeroom");
const loadUsers = require("./loadUsers");
router.use("/auth", authRouter);
router.use("/storeroom", storeroomRouter);
router.use("/loadUsers", loadUsers);
module.exports = router;
