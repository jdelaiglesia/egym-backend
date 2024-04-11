const Product = require("../models/Product");

const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createProduct = async (req, res) => {};

const updateProduct = async (req, res) => {};

const deleteProduct = async (req, res) => {};

module.exports = {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
