const { Router } = require("express");

const router = Router();

const hellowWorld = require("../controllers/helloWorld");

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

//! POST
router.post("/product", createProduct);

//! PUT
router.put("/product/:id", updateProduct);

//! DELETE
router.delete("/product/:id", deleteProduct);

module.exports = router;
