const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
//------------------------------------------

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  writer: { type: String, required: true },
  explan: { type: String, required: true },
  pric: { type: Number, required: true },
  count: { type: Number, required: true },
  category: { type: String, required: true },
});
productSchema.plugin(timestamp);
module.exports = mongoose.model("Product", productSchema);
