const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const addLinkRouter = require("./link");
const vidoeRouter = require("./videos");
const ScubscribeRouter = require("./subscribe");
const CommentsRouter = require("./comment");
const LikeRouer = require("./likeAndDisLike");
const { isLoggined } = require("./../middlewares/auth");
const error = require("./../middlewares/error");

router.use("/auth", authRouter);
router.use("/videos", vidoeRouter);
router.use("/subscribe", ScubscribeRouter);
router.use("/comments", CommentsRouter);
router.use("/likeAndDislike", LikeRouer);
router.use("/addLink", addLinkRouter);

router.use(error);
module.exports = router;
