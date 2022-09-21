const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const Books = require("../models/video");
//------------------------------------------

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  userName: { type: String, require: true, max: 20 },
  password: { type: String, require: true },
  isAdmin: { type: Boolean, default: false },
  avatarPath: { type: String },
});

userSchema.plugin(timestamp);

module.exports = mongoose.model("User", userSchema);
