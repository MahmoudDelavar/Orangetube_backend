const controller = require("./../controller");
const _ = require("lodash");

//-----------------------------------------------------

module.exports = new (class extends controller {
  //----------Storeroome Controllers-----
  async addProduct(req, res) {
    let product = await this.Product.findOne({ title: req.body.title });
    if (product) {
      return this.response({
        res,
        code: 400,
        message: "این کتاب قبلا ثیت شده است ",
        data: null,
      });
    }

    product = new this.Product(
      _.pick(req.body, [
        "title",
        "writer",
        "count",
        "pric",
        "explan",
        "category",
      ])
    );

    await product.save();
    this.response({
      res,
      message: "کتاب با موفقیت ثبت شد ",
      code: 202,
      data: _.pick(product, [
        "title",
        "writer",
        "count",
        "pric",
        "explan",
        "category",
      ]),
    });
    console.log("added new book to database ");
  }

  async getProducts(req, res) {
    let category = req.query.category;
    let books = await this.Product.find({ category: category })
      .sort({ createdAt: -1 })
      .exec();
    this.response({ res, message: "load the Books ", code: 200, data: books });
  }
  async getProduct(req, res) {
    let bookName = req.query.title;
    let books = await this.Product.findOne({ title: bookName }).exec();

    if (!books) {
      return this.response({
        res,
        message: "کتاب مورد نظر یافت ",
        code: 400,
      });
    }
    this.response({ res, message: "finde Book ", code: 200, data: books });
    console.log("query is", bookName);
  }
})();
