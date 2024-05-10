const { Router } = require("express");
const { verifyJWT } = require("../middlewares/verifyJwt");
const { verifyAdmin } = require("../middlewares/verifyAdmin");
const { getVerify } = require("../controllers/verify");

const { sendRegisterEmail, sendOrderEmail } = require("../controllers/mailer");


const router = Router();

const hellowWorld = require("../controllers/helloWorld");

const {
  createDiscountCoupon,
  getDiscountCoupon,
  updateDiscountCoupon,
  deleteDiscountCoupon,
  getAllCoupons,
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
  updateProfile,
  adminLogin,
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
  createPreferenceMercadoPago,
  getDataPayment,
} = require("../controllers/mercadoPago");

const {
  getAllSales,
  getSale,
  createSale,
  completeSale,
  deleteSale,
} = require("../controllers/sale");

const { getStats } = require("../controllers/stats");

// GET Verify Admin
router.get("/dashboard/verify", verifyAdmin, getVerify);

// GET Verify User
router.get("/auth/token", verifyJWT, getVerify);

// POST Login Dashboard
router.post("/dashboard/auth", adminLogin);

//* Routes Admin
router.get("/users", verifyAdmin, getUsers);
router.post("/product", verifyAdmin, createProduct);
router.post("/coupon", verifyAdmin, createDiscountCoupon);
router.post("/category", verifyAdmin, postCategory);
router.put("/product/:id", verifyAdmin, updateProduct);
router.put("/coupon", verifyAdmin, updateDiscountCoupon);
router.put("/user/member/:id", verifyAdmin, putMember);
router.put("/user/rank/:id", verifyAdmin, putRank);
router.put("/category/:id", verifyAdmin, putCategory);
router.delete("/product/:id", verifyAdmin, deleteProduct);
router.delete("/user/:id", verifyAdmin, deleteUser);
router.delete("/category/:id", verifyAdmin, deleteCategory);
router.delete("/comment/:id", verifyAdmin, deleteComment);
router.delete("/coupon/:id", verifyAdmin, deleteDiscountCoupon);
router.delete("/sale/:id", verifyAdmin, deleteSale);

//! GET
router.get("/helloworld", hellowWorld);
router.get("/product/:id", getProduct);
router.get("/products", getAllProducts);
router.get("/products/category/:id", getCategoryProducts);
router.get("/products/filters", getFilteredProducts);
router.get("/product/name/:name", getNameProduct);
router.get("/coupon/:name", getDiscountCoupon);
router.get("/coupons", getAllCoupons);
router.get("/users", getUsers);
router.get("/user/:email", getUserByEmail);
router.get("/categories", getCategories);
router.get("/category/:name", getCategory);
router.get("/comments/:id", getCommentsProduct);
router.get("/sales", getAllSales);
router.get("/sale/:id", getSale);
router.get("/stats", getStats);

//! POST
router.post("/product", createProduct);
router.post("/coupon", createDiscountCoupon);
router.post("/user", postUser);
router.post("/user/login", userLogin);
router.post("/category", postCategory);
router.post("/comment", postComment);
router.post("/registeremail", sendRegisterEmail);
router.post("/orderemail", sendOrderEmail);
router.post("/payment", createPreferenceMercadoPago);
router.post("/datapayment", getDataPayment);
router.post("/sale", createSale);

//! PUT
router.put("/product/:id", updateProduct);
router.put("/coupon", updateDiscountCoupon);
router.put("/user/:id", putUser);
router.put("/user/member/:id", putMember);
router.put("/user/rank/:id", putRank);
router.put("/category/:id", putCategory);
router.put("/sale/:id", completeSale);
router.put("/user/update/:id", verifyJWT, updateProfile);

//! DELETE
router.delete("/product/:id", deleteProduct);
router.delete("/user/:id", deleteUser);
router.delete("/category/:id", deleteCategory);
router.delete("/comment/:id", deleteComment);
router.delete("/coupon/:id", deleteDiscountCoupon);
router.delete("/sale/:id", deleteSale);

module.exports = router;
