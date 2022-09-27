const controller = require("../controller");
const _ = require("lodash");

//-----------------------------------------------------

module.exports = new (class extends controller {
  //--------------subscribe
  async subscribe(req, res) {
    const { userTo, userFrom } = req.body.info;
    if (!userTo || !userFrom) {
      return this.response({
        res,
        code: 400,
        message: "unable to subscribe",
        data: null,
      });
    }

    const subscribe = new this.Subscribe({ userTo, userFrom });
    await subscribe.save();
    this.response({ res, code: 200, message: "success", data: null });
    // console.log("Subscrined");
  }

  //--------------Unsubscribe
  async unsubscribe(req, res) {
    const { userTo, userFrom } = req.body.info;

    if (!userTo || !userFrom) {
      return this.response({
        res,
        code: 400,
        message: "unable to unsubscribe",
        data: null,
      });
    }
    const result = await this.Subscribe.findOne({ userTo, userFrom });
    if (!result) {
      return this.response({
        res,
        code: 400,
        data: null,
        message: "cant be finde ",
      });
    }
    await this.Subscribe.findByIdAndDelete(result._id);
  }

  //--------------Is Subscribe Or Not
  async isSubscribe(req, res) {
    const { userTo, userFrom } = req.body.info;
    if (!userTo || !userFrom) {
      return this.response({
        res,
        code: 400,
        message: "isSubscribe Check failed",
        data: null,
      });
    }
    const result = await this.Subscribe.find({ userTo, userFrom }).exec();
    if (!result) {
      return this.response({
        res,
        data: 400,
        data: null,
        message: "not found - isSubscribe",
      });
    }
    let isSubscribe = false;
    if (result.length !== 0) {
      isSubscribe = true;
    }
    this.response({ res, code: 200, message: "success", data: isSubscribe });
    // console.log("isSubscribe", isSubscribe);
  }
  //--------------subscribe Number

  async subscribeNumber(req, res) {
    const { userTo } = req.body;

    if (!userTo) {
      return this.response({
        res,
        code: 400,
        message: "subscribe numbers faild - userTo Invalid",
        data: null,
      });
    }
    const result = await this.Subscribe.find({ userTo }).exec();
    if (!result) {
      return this.response({
        res,
        message: "not foud eny subscriber...",
        data: null,
      });
    }
    this.response({ res, code: 200, message: "success", data: result.length });
    // console.log(" subscruber Counts:", result.length)
  }
  //--------------finde all subscribed coounts and send vidoes to fornt
  async subscribtions(req, res) {
    const userFrom = req.body.userFrom;
    if (!userFrom) {
      return this.response({
        res,
        code: 400,
        data: null,
        message: "subscribtions failed",
      });
    }
    const subscrebeds = await this.Subscribe.find({ userFrom }).exec();

    let subscribeUse = [];
    subscrebeds.forEach((u) => subscribeUse.push(u.userTo));

    const videos = await this.Video.find({
      writer: { $in: subscribeUse },
    })
      .populate("writer", "avatarPath userName")
      .exec();
    this.response({ res, code: 200, message: "success", data: videos });
  }
})();
