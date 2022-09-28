const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
//------------------------------------------

const dislikeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VIdeo",
  },
});
dislikeSchema.plugin(timestamp);
module.exports = mongoose.model("DisLike", dislikeSchema);
