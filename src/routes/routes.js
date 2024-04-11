const { Router } = require("express");

const router = Router();

const hellowWorld = require("../controllers/helloWorld");

const {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

//! GET
router.get("/helloworld", hellowWorld);
router.get("/product/:id", getProduct);

//! POST
router.post("/product", createProduct);

//! PUT
router.put("/product/:id", updateProduct);

//! DELETE
router.delete("/product/:id", deleteProduct);

module.exports = router;
