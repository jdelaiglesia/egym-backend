const Sale = require("../models/Sale");
const todayDate = new Date();

const createSale = async (req, res) => {
  try {
    const { total, products } = req.body;
    const sale = new Sale({ date: todayDate, total, products });
    await sale.save();
    res.status(201).json({ message: "sale created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSale,
};
