const Sale = require("../models/Sale");
const User = require("../models/User");
const Product = require("../models/Product");
const DiscountCoupon = require("../models/DiscountCoupon");
const axios = require("axios");
const todayDate = new Date();

const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find({ deleted: false })
      .populate("user", "_id name last_name email address phone_number")
      .populate({
        path: "products._id",
        model: "product",
        select: "_id name url_image",
      });
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSale = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await Sale.findOne({ _id: id, deleted: { $ne: true } });
    if (sale) {
      res.status(200).json(sale);
    } else {
      res.status(404).json({ message: "Sale not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createSale = async (req, res) => {
  try {
    const { products, user, id, coupon } = req.body;

    let total = 0;

    for (let i = 0; i < products.length; i++) {
      const product = await Product.findOne({
        _id: products[i]._id,
        deleted: { $ne: true },
      });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      total += product.price * products[i].quantity;
    }

    const coupons = await DiscountCoupon.find();
    const couponSearcheado = coupons.find((c) => c.name === coupon);

    let discount = (Number(total) * Number(couponSearcheado.percentage)) / 100;

    const sale = new Sale({
      date: todayDate,
      total: (total - discount).toFixed(1),
      products,
      user,
      id,
    });

    const userExists = await User.findOne({
      _id: user,
      deleted: { $ne: true },
    });

    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    await sale.save();

    res.status(201).json({ message: "Sale created successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const completeSale = async (req, res) => {
  try {
    const { id } = req.params;

    const sale = await Sale.findOne({ id: id, deleted: { $ne: true } });

    if (sale) {
      const idUser = sale.user.toString();

      const userData = await User.findOne({
        _id: idUser,
        deleted: { $ne: true },
      });

      const email = userData?.email;

   

      sale.status = "completed";

      const products = sale.products;

      for (let i = 0; i < products.length; i++) {
        const product = await Product.findOne({
          _id: products[i]._id,
          deleted: { $ne: true },
        });
        product.stock -= products[i].quantity;
        await product.save();
      }
      
      await axios.post("http://localhost:3001/api/orderemail", {email: email} ); 
      await sale.save();


      res.status(200).json({ message: "Sale completed successfully" });
    } else {
      res.status(404).json({ message: "Sale not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;

    const sale = await Sale.findOne({ _id: id, deleted: { $ne: true } });

    if (sale) {
      sale.deleted = true;

      await sale.save();

      res.status(200).json({ message: "Sale deleted successfully" });
    } else {
      res.status(404).json({ message: "Sale not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllSales,
  getSale,
  createSale,
  completeSale,
  deleteSale,
};
