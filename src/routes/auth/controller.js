const controller = require("./../controller");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
//-----------------------------------------------------

module.exports = new (class extends controller {
  //----------register Controller-----
  async register(req, res) {
    let user = await this.User.findOne({ email: req.body.email });
    if (user) {
      return this.response({
        res,
        code: 400,
        message: " این ایمیل قبلا ثبت شده است",
      });
    }

    user = new this.User(_.pick(req.body, ["name", "email", "password"]));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    this.response({
      res,
      message: "ثبت نام با موفقیت انجام شد",
      code: 202,
      data: _.pick(user, ["name", "email"]),
    });
    console.log("body:", req.body);
  }

  //----------login Controller--------
  async login(req, res) {
    const user = await this.User.findOne({ email: req.body.email });
    if (!user) {
      return this.response({
        res,
        message: " رمز عبور ویا ایمیل صحیح نیست",
        code: 400,
      });
    }
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      return this.response({
        res,
        message: "  رمز عبور ویا ایمیل صحیح نیست",
        code: 400,
      });
    }
    const token = jwt.sign({ _id: user.id }, config.get("jwt_key"));
    this.response({
      res,
      message: "خوش آمدید ",
      code: 200,
      data: token,
    });
  }
})();
