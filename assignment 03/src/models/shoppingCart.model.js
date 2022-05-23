const mongoose = require("mongoose");

("use strict");

let Schema = mongoose.Schema;

let ProductsSchema = new Schema(
  {
    Pokeid: String,
    name: String,
    price: Number,
  },
  { collection: "products" }
);

module.exports = mongoose.model("Products", ProductsSchema);
