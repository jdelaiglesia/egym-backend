const mongoose = require("mongoose");

const DiscountCouponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  percentage: {
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

const DiscountCoupon = mongoose.model("DiscountCoupon", DiscountCouponSchema);

module.exports = DiscountCoupon;