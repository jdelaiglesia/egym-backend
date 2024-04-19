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

const {
  getUsers,
  getUserByEmail,
  postUser,
  putUser,
  deleteUser
} = require('../controllers/user')

//! GET
router.get("/helloworld", hellowWorld);
router.get("/product/:id", getProduct);
router.get("/products", getAllProducts)
router.get("/product/name/:name", getNameProduct)
router.get("/coupon/:name", getDiscountCoupon)
router.get("/users", getUsers)
router.get("/user/:email", getUserByEmail)


//! POST
router.post("/product", createProduct);
router.post("/coupon", createDiscountCoupon)
router.post("/user", postUser)

//! PUT
router.put("/product/:id", updateProduct);
router.put("/coupon", updateDiscountCoupon)
router.put("/user/:id", putUser)

//! DELETE
router.delete("/product/:id", deleteProduct);
router.delete("/user/:id", deleteUser)

module.exports = router;
