const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

const Product = mongoose.model("product", ProductSchema);

module.exports = Product;
