const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
//------------------------------------------

const linkSchema = new mongoose.Schema({
  link: { type: String },
});

linkSchema.plugin(timestamp);
module.exports = mongoose.model("Link", linkSchema);
