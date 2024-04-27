const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  deleted: {
    type: Boolean,
    default: false,
  },
});

const Sale = mongoose.model("Sale", SaleSchema);

module.exports = Sale;
