const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
//------------------------------------------

const likeSchema = new mongoose.Schema({
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
likeSchema.plugin(timestamp);
module.exports = mongoose.model("Like", likeSchema);
