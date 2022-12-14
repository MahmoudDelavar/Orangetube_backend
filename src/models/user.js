const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
//------------------------------------------

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  userName: { type: String, required: true, max: 20 },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  avatarPath: {
    type: String,
  },
});

userSchema.plugin(timestamp);

module.exports = mongoose.model("User", userSchema);
