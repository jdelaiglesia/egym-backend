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

// GET Verify
router.get("/auth/token", verifyJWT, getVerify);

//! GET
router.get("/helloworld", hellowWorld);
router.get("/product/:id", getProduct);
router.get("/products", getAllProducts);
router.get("/products/category/:id", getCategoryProducts);
router.get("/product/name/:name", getNameProduct);
router.get("/coupon/:name",verifyJWT, getDiscountCoupon);
router.get("/users",verifyJWT, getUsers);
router.get("/user/:email",verifyJWT, getUserByEmail);
router.get("/categories", getCategories);
router.get("/category/:name", getCategory);
router.get("/comments/:id", getCommentsProduct);

//! POST
router.post("/product", verifyJWT, createProduct);
router.post("/coupon", verifyJWT, createDiscountCoupon);
router.post("/user", postUser);
router.post("/user/login", userLogin);
router.post("/category", verifyJWT, postCategory);
router.post("/comment", verifyJWT, postComment);

//! PUT
router.put("/product/:id", verifyJWT, updateProduct);
router.put("/coupon", verifyJWT, updateDiscountCoupon);
router.put("/user/:id", verifyJWT, putUser);
router.put("/user/member/:id", verifyJWT, putMember);
router.put("/user/rank/:id", verifyJWT, putRank);
router.put("/category/:id", verifyJWT, putCategory);

//! DELETE
router.delete("/product/:id", deleteProduct);
router.delete("/user/:id", deleteUser);
router.delete("/category/:id", verifyJWT, deleteCategory);
router.delete("/comment/:id", deleteComment);
router.delete("/coupon/:id", verifyJWT, deleteDiscountCoupon);

module.exports = router;
