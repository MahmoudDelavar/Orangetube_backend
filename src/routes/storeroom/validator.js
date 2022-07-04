const expressValidator = require("express-validator");
const check = expressValidator.check;

module.exports = new (class {
  storeroomValidator() {
    return [
      check("title").not().isEmpty().withMessage("title cant be empty"),
      check("writer").not().isEmpty().withMessage("writer cant be empty"),
      check("count").not().isEmpty().withMessage("count cant be empty"),
      check("pric").not().isEmpty().withMessage("price cant be empty"),
      check("count").not().isEmpty().withMessage("count cant be empty"),
      check("category").not().isEmpty().withMessage("category cant be empty"),
    ];
  }
})();
