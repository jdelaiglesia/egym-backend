const { Router } = require("express");

const router = Router();

const hellowWorld = require("../controllers/helloWorld");

const {
  createDiscountCoupon,
  getDiscountCoupon,
  updateDiscountCoupon,
} = require("../controllers/discountCoupon")

const {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getNameProduct,
} = require("../controllers/product");

//! GET
router.get("/helloworld", hellowWorld);
router.get("/product/:id", getProduct);
router.get("/products", getAllProducts)
router.get("/product/name/:name", getNameProduct)
router.get("/coupon/:name", getDiscountCoupon)

//! POST
router.post("/product", createProduct);
router.post("/coupon", createDiscountCoupon)

//! PUT
router.put("/product/:id", updateProduct);
router.put("/coupon", updateDiscountCoupon)

//! DELETE
router.delete("/product/:id", deleteProduct);

module.exports = router;
