const controller = require("./../controller");
const _ = require("lodash");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

//-----------------------------------------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/videos/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname + "loaded");
    if (ext !== ".mp4") {
      return cb(res.status(400).send("only mp4 allowed "), false);
    }
    cb(null, true);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: "5mb" },
}).single("file");

//-----------------------------------------------------
let thumbFliePath = "";
let fileDuration = "";

//-----------------------------------------------------

module.exports = new (class extends controller {
  //--------------Add Video
  async addVideo(req, res) {
    let video = await this.Video.findOne({ title: req.body.title });

    if (video) {
      return this.response({
        res,
        code: 400,
        message: "این ویدئو قبلا ثیت شده است ",
        data: null,
      });
    }
    video = new this.Video(
      _.pick(req.body, [
        "writer",
        "title",
        "description",
        "category",
        "filePath",
        "duration",
        "thumbnail",
      ])
    );

    await video.save();
    this.response({
      res,
      message: "ویدئو با موفقیت ثبت شد ",
      code: 202,
      data: _.pick(video, [
        "writer",
        "title",
        "description",
        "filePath",
        "category",
        "duration",
        "thumbnail",
      ]),
    });
  }
  //--------------load Video
  async loadVideo(req, res) {
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
        message: "success load",
      });
    });
  }
  //--------------thumbnail Video
  async thumbnailVideo(req, res) {
    ffmpeg.ffprobe(req.body.filePath, function (err, metadata) {
      fileDuration = metadata.format.duration;
    });
    ffmpeg(req.body.filePath)
      .on("filenames", function (filenames) {
        // console.log("Will generate " + filenames.join(", "));
        thumbFliePath = "public/uploads/thumbnails/" + filenames[0];
      })
      .on("end", () => {
        this.response({
          res,
          code: 202,
          data: { thumbFliePath: thumbFliePath, fileDuration: fileDuration },
          message: "success",
        });
      })
      .screenshots({
        // Will take screens at 20%, 40%, 60% and 80% of the video
        count: 1,
        folder: "public/uploads/thumbnails",
        size: "320x240",
        filename: "thumbnail_%b.png",
      });
    //--------------thumbnail Video
  }
  //--------------get All Video
  async allVidos(req, res) {
    const result = await this.Video.find()
      .populate("writer", "avatarPath userName _id")
      .sort({ createdAt: -1 })
      .exec();
    this.response({
      res,
      code: 200,
      message: "Loaded All vidoe",
      data: result,
    });
  }

  //--------------getOne Video
  async getVideo(req, res) {
    const videoId = req.body.videoId;
    const result = await this.Video.findById(videoId).populate(
      "writer",
      "avatarPath userName"
    );
    this.response({
      res,
      code: 200,
      message: "Finde the vidoe",
      data: result,
    });
  }
})();
