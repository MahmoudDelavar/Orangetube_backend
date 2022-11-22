const controller = require("../controller");
const _ = require("lodash");

//-----------------------------------------------------

module.exports = new (class extends controller {
  //--------------add New Comment
  async addlink(req, res) {
    const { data } = req.body;

    const newLink = new this.Link({
      link: data,
    });

    await newLink.save();

    this.response({
      res,
      code: 201,
      data: null,
      message: "!Successfull Saved Link",
    });
  }
})();
