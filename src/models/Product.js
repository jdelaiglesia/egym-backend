const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  url_image: {
    type: String,
    required: true,
  },
  category: {
    type: ObjectId, 
    ref: 'Category',
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

const Product = mongoose.model("product", ProductSchema);

module.exports = Product;
