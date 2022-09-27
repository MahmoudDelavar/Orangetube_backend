const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
//------------------------------------------

const commentSchema = mongoose.Schema({
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  replier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
  },
  text: {
    type: String,
  },
});

commentSchema.plugin(timestamp);

module.exports = mongoose.model("Comment", commentSchema);
