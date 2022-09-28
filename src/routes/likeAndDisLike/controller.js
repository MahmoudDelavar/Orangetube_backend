const controller = require("../controller");
const _ = require("lodash");

//-----------------------------------------------------

module.exports = new (class extends controller {
  //--------------Like Count
  async likedCount(req, res) {
    let info = {};
    if (req.body.videoId) {
      info = { videoId: req.body.videoId };
    } else {
      info = { commentId: req.body.commentId };
    }

    const resutl = await this.Like.find(info).exec();
    this.response({ res, code: 200, message: "success", data: resutl });
  }

  //--------------DisLike Count
  async disLikedCount(req, res) {
    let info = {};
    if (req.body.videoId) {
      info = { videoId: req.body.videoId };
    } else {
      info = { commentId: req.body.commentId };
    }

    const resutl = await this.DisLike.find(info).exec();
    this.response({ res, code: 200, message: "success", data: resutl });
  }

  //-------------- Like
  async like(req, res) {
    let info = {};

    if (req.body.videoId) {
      info = { videoId: req.body.videoId };
    } else {
      info = { commentId: req.body.commentId };
    }
    info.userId = req.body.userId;

    await this.DisLike.findOneAndDelete(info);

    let newLike = new this.Like(info);
    await newLike.save();

    const resutl = await this.Like.find(info).exec();
    this.response({ res, code: 200, message: "success", data: resutl });
  }

  //-------------- UnLike
  async unLike(req, res) {
    let info = {};

    if (req.body.videoId) {
      info = { videoId: req.body.videoId };
    } else {
      info = { commentId: req.body.commentId };
    }
    info.userId = req.body.userId;

    await this.Like.findOneAndDelete(info);
    const resutl = await this.Like.find(info).exec();
    this.response({ res, code: 200, message: "success", data: resutl });
  }
  //-------------- DisLike
  async disLike(req, res) {
    let info = {};

    if (req.body.videoId) {
      info = { videoId: req.body.videoId };
    } else {
      info = { commentId: req.body.commentId };
    }
    info.userId = req.body.userId;

    await this.Like.findOneAndDelete(info);

    let newDisLike = new this.DisLike(info);
    await newDisLike.save();
    const resutl = await this.DisLike.find(info).exec();
    this.response({ res, code: 200, message: "success", data: resutl });
  }

  //-------------- UnDisLike
  async unDisLike(req, res) {
    let info = {};

    if (req.body.videoId) {
      info = { videoId: req.body.videoId };
    } else {
      info = { commentId: req.body.commentId };
    }
    info.userId = req.body.userId;

    await this.DisLike.findOneAndDelete(info);
    const resutl = await this.DisLike.find(info).exec();
    this.response({ res, code: 200, message: "success", data: resutl });
  }
})();
