const autoBind = require("auto-bind");
const { validationResult } = require("express-validator");
const User = require("./../models/user");
const Video = require("./../models/video");
const Subscribe = require("../models/subscribe");
const Comment = require("./../models/comment");
const like = require("../models/like");
const dislike = require("../models/dislike");
const link = require("../models/link");

//---------------------------------------------------------
module.exports = class {
  constructor() {
    autoBind(this);
    this.User = User;
    this.Video = Video;
    this.Subscribe = Subscribe;
    this.Comment = Comment;
    this.Like = like;
    this.DisLike = dislike;
    this.Link = link;
  }
  vaildationBody(req, res) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const errors = result.array();
      const message = [];
      errors.forEach((errors) => message.push(errors.msg));
      res.status(400).json({
        message: " validation Error",
        data: message,
      });
      return false;
    }
    return true;
  }
  validate(req, res, next) {
    if (!this.vaildationBody(req, res)) {
      return;
    }
    next();
  }
  response({ res, message, code = 200, data = {} }) {
    res.status(code).json({
      message,
      data,
    });
  }
};
