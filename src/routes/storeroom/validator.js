const expressValidator = require("express-validator");
const check = expressValidator.check;

module.exports = new (class {
  storeroomValidator() {
    return [
      check("title").not().isEmpty().withMessage("name cant be empty"),
      check("writer").not().isEmpty().withMessage("name cant be empty"),
      check("count").not().isEmpty().withMessage("name cant be empty"),
      check("price").not().isEmpty().withMessage("name cant be empty"),
    ];
  }
})();
