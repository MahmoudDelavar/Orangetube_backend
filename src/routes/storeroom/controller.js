const controller = require("./../controller");
const _ = require("lodash");

//-----------------------------------------------------

module.exports = new (class extends controller {
  //===============Storeroome Controllers===============
  async getAllProducts(req, res) {
    const result = await this.Product.find().sort({ createdAt: -1 }).exec();
    this.response({
      res,
      code: 200,
      message: "Load All books",
      data: result,
    });
  }

  //--------------Add Product
  async addProduct(req, res) {
    console.log("from redux", req.body);
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

  //--------------Get Product
  async getProducts(req, res) {
    const category = req.query.category;
    const books = await this.Product.find({ category: category })
      .sort({ createdAt: -1 })
      .exec();
    this.response({ res, message: "load the Books ", code: 200, data: books });
  }
  //--------------Get One Product
  async getOneProduct(req, res) {
    const bookName = req.query.title;
    const books = await this.Product.findOne({ title: bookName }).exec();

    if (!books) {
      return this.response({
        res,
        message: " کتاب مورد نظر یافت نشد ",
        code: 400,
      });
    }
    this.response({
      res,
      message: "کتاب مورد نظر یافت شد  ",
      code: 200,
      data: books,
    });
  }

  //--------------Edit Product
  async updateProduct(req, res) {
    const bookName = req.body.oldTitle;
    const book = await this.Product.findOne({ title: bookName }).exec();
    if (!book) {
      return this.response({
        res,
        message: "کتاب مورد نظر یافت نشد  ",
        code: 400,
      });
    }

    const editedBook = await this.Product.findByIdAndUpdate(
      book._id,
      {
        $set: {
          title: req.body.title,
          writer: req.body.writer,
          count: req.body.count,
          pric: req.body.pric,
          explan: req.body.explan,
          category: req.body.category,
        },
      },
      { new: true }
    );
    this.response({
      res,
      message: "اطلاعات ویرایش شد ",
      code: 200,
      data: editedBook,
    });

    console.log("Updated Book info");
  }

  //--------------Delete One Product
  async deleteOneProduct(req, res) {
    const bookName = req.query.title;
    const book = await this.Product.find({ title: bookName }).exec();
    if (!book) {
      return this.response({ res, message: "کتاب یافت نشد", code: 400 });
    }

    const deleted = await this.Product.deleteOne({ title: bookName });
    this.response({ res, message: `کتاب "${bookName}" حذف شد ` });
    console.log("Deleted One Book", deleted);
  }
})();
