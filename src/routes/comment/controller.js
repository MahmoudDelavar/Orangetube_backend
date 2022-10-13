const controller = require("../controller");
const _ = require("lodash");

//-----------------------------------------------------

module.exports = new (class extends controller {
  //--------------add New Comment
  async addComment(req, res) {
    const { text, commentWriter, postId } = req.body.info;
    if (!text || !commentWriter || !postId) {
      return this.response({
        res,
        code: 400,
        data: null,
        message: " cant be saved Comment- bad info recived",
      });
    }
    const newComment = new this.Comment({
      writer: commentWriter,
      text,
      postId,
    });

    await newComment.save();

    const comment = await this.Comment.find({ _id: newComment._id })
      .populate("writer", "userName avatarPath _id")
      .exec();

    this.response({
      res,
      code: 201,
      data: comment,
      message: "load last Commnet",
    });
  }

  //--------------Load Comments By PostId
  async getComments(req, res) {
    const postId = req.body.videoId;
    const comments = await this.Comment.find({ postId: postId })
      .populate("writer", "userName avatarPath _id")
      .exec();

    this.response({
      res,
      code: 200,
      data: comments,
      message: "success load this post comments",
    });
    
  }
})();
