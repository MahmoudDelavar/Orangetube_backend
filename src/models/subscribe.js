const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const User = require("./user");

const subscribeSchema = new mongoose.Schema({
  userTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

subscribeSchema.plugin(timestamp);
module.exports = mongoose.model("Subscribe", subscribeSchema);
