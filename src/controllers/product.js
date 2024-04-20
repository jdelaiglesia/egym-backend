const Product = require("../models/Product");

const getNameProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    const filterName = products.filter((p) => p.name.includes(req.params.name));
    if (filterName.length > 0) return res.status(200).json(filterName);
    else return res.status(404).json({ message: "Product not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const getAll = await Product.find({ available: true });
    res.status(200).json(getAll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const products = await Product.findOne({
      _id: req.params.id,
      deleted: { $ne: true },
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCategoryProducts = async (req, res) => {
  const id = req.params.id
  try {
    const products = await Product.find({ category: id });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const createProduct = async (req, res) => {
  try {
    const { name, stock, price, available, url_image, category } = req.body;
    const product = new Product({
      name,
      stock,
      price,
      available,
      url_image,
      category,
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, price, available } = req.body;
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product || product.deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name;
    product.price = price;
    product.available = available;

    await product.save();

    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product || product.deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.deleted = true;

    await product.save();

    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getNameProduct,
  getCategoryProducts
};
