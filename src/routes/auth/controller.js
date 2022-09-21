const controller = require("./../controller");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const multer = require("multer");

//-----------------------------------------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/userAvatar/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname + "loaded");
    if (ext !== ".jpg" || ".png") {
      return cb(res.status(400).send("only jpg or png allowed "), false);
    }
    cb(null, true);
  },
});
const upload = multer({ storage: storage }).single("file");
//-----------------------------------------------------

module.exports = new (class extends controller {
  //----------Load avatar Controller-----
  async loadAvatar(req, res) {
    upload(req, res, (err) => {
      if (err) {
        return this.response({
          res,
          code: 400,
          message: `save failde #${err} `,
        });
      }
      return this.response({
        res,
        code: 200,
        data: { filePath: res.req.file.path, fileNeme: res.req.file.filename },
        message: "success load avatar",
      });
    });
  }

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
    user = new this.User(
      _.pick(req.body, ["userName", "email", "password", "avatarPath"])
    );
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    this.response({
      res,
      message: "ثبت نام با موفقیت انجام شد",
      code: 202,
      data: _.pick(user, ["userName", "email", "avatarPath"]),
    });
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
  //----------User By Id Controller--------
  async userbytoken(req, res) {
    const token = req.body.token;

    if (!token) {
      return this.response({
        res,
        code: 400,
        data: null,
        message: "invalid Token",
      });
    }
    try {
      const decoded = jwt.verify(token, config.get("jwt_key"));
      const user = await this.User.findById(decoded._id);
      this.response({
        res,
        code: 200,
        data: {
          email: user.email,
          userName: user.userName,
          avatar: user.avatarPath,
          id: user._id,
        },
        message: "Allowed_Access",
      });
    } catch (err) {
      this.response({ res, code: 400, message: "invalid token" });
    }
  }
})();
