const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
//------------------------------------------

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, require: true, max: 20 },
  password: { type: String, require: true },
  isAdmin: { type: Boolean, default: false },
});

userSchema.plugin(timestamp);

module.exports = mongoose.model("User", userSchema);
