const { Router } = require("express");
const { verifyJWT } = require("../middlewares/verifyJwt");
const { getVerify } = require("../controllers/verify");

const router = Router();

const hellowWorld = require("../controllers/helloWorld");

const {
  createDiscountCoupon,
  getDiscountCoupon,
  updateDiscountCoupon,
  deleteDiscountCoupon,
} = require("../controllers/discountCoupon");


const {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getNameProduct,
  getCategoryProducts,
  getFilteredProducts,
} = require("../controllers/product");

const {
  getUsers,
  getUserByEmail,
  postUser,
  putUser,
  deleteUser,
  userLogin,
  putMember,
  putRank,
} = require("../controllers/user");

const {
  getCategories,
  getCategory,
  postCategory,
  putCategory,
  deleteCategory,
} = require("../controllers/category");

const {
  getCommentsProduct,
  postComment,
  deleteComment,
} = require("../controllers/comment");

const {
  getAllSales,
  getSale,
  createSale,
  completeSale,
  deleteSale,
} = require("../controllers/sale");

// GET Verify
router.get("/auth/token", verifyJWT, getVerify);

//! GET
router.get("/helloworld", hellowWorld);
router.get("/product/:id", getProduct);
router.get("/products", getAllProducts);
router.get("/products/category/:id", getCategoryProducts);
router.get("/products/filters", getFilteredProducts);
router.get("/product/name/:name", getNameProduct);
router.get("/coupon/:name", getDiscountCoupon);
router.get("/users", getUsers);
router.get("/user/:email", getUserByEmail);
router.get("/categories", getCategories);
router.get("/category/:name", getCategory);
router.get("/comments/:id", getCommentsProduct);
router.get("/sales", getAllSales);
router.get("/sale/:id", getSale);


//! POST
router.post("/product", createProduct);
router.post("/coupon", createDiscountCoupon);
router.post("/user", postUser);
router.post("/user/login", userLogin);
router.post("/category", postCategory);
router.post("/comment", postComment);
router.post("/sale", createSale);

//! PUT
router.put("/product/:id", updateProduct);
router.put("/coupon", updateDiscountCoupon);
router.put("/user/:id", putUser);
router.put("/user/member/:id", putMember);
router.put("/user/rank/:id", putRank);
router.put("/category/:id", putCategory);
router.put("/sale/:id", completeSale);

//! DELETE
router.delete("/product/:id", deleteProduct);
router.delete("/user/:id", deleteUser);
router.delete("/category/:id", deleteCategory);
router.delete("/comment/:id", deleteComment);
router.delete("/coupon/:id", deleteDiscountCoupon);
router.delete("/sale/:id", deleteSale);

module.exports = router;
