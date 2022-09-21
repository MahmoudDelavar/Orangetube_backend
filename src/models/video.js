const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const User = require("../models/user");
const videoSchema = new mongoose.Schema({
  writer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String },
  description: { type: String },
  filePath: { type: String },
  category: { type: String },
  wiews: { type: Number },
  duration: { type: Number },
  thumbnail: { type: String },
});
videoSchema.plugin(timestamp);

module.exports = mongoose.model("Video", videoSchema);
