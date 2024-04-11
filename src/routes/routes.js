const { Router } = require("express");

const router = Router();

const helloWorld = require("../controllers/helloWorld");
const {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

//! GET
router.get("/helloworld", helloWorld);
router.get("/product", getProduct);

//! POST
router.post("/product", createProduct);

//! PUT
router.put("/product/:id", updateProduct);

//! DELETE
router.delete("/product/:id", deleteProduct);

module.exports = router;
