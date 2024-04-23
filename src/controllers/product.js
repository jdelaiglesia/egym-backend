const Product = require("../models/Product");
const Comments = require("../models/Comments");

const getNameProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    const filterName = products.filter((p) => p.name.includes(req.params.name));
    if (filterName.length > 0) return res.status(200).json(filterName);
    else return res.status(404).json({ message: "Product not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const getAll = await Product.find({ available: true });
    res.status(200).json(getAll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      deleted: { $ne: true },
    });

    const comments = await Comments.find({ product_id: product._id });

    const sendProduct = { ...product._doc, comments };

    res.json(sendProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCategoryProducts = async (req, res) => {
  const id = req.params.id;
  try {
    const products = await Product.find({
      category: id,
      deleted: { $ne: true },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, stock, price, available, url_image, category, description } =
      req.body;
    const product = new Product({
      name,
      stock,
      price,
      available,
      url_image,
      category,
      description,
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, price, available } = req.body;
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product || product.deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name;
    product.price = price;
    product.available = available;

    await product.save();

    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product || product.deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.deleted = true;

    await product.save();

    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getNameProduct,
  getCategoryProducts,
};

/*

Product Detail -> Opiniones -> CreateComment -> Form {
    product_id: id (PARAMS),
    username: context_auth (CONTEXT),
    content: form (TEXTAREA),
    stars: form (INPUT),
}

Comments -> [
{
  product_id: "6625d14202f0dd78c76d3566",
  user_name: "Rafael",
  content: "Muy buen producto.",
  stars: 4.5
},
{
  product_id: "661ef298bf502c6159836e37",
  user_name: "Dario",
  content: "No lo recomiendo, pero si",
  stars: 3.5
},
{
  product_id: "661ef298bf502c6159836e36",
  user_name: "Toni",
  content: "Un 1000",
  stars: 5
},
{
  product_id: "6625d14202f0dd78c76d3566",
  user_name: "Matias",
  content: "Muy buen producto, super recomendable",
  stars: 5
},
]

const comments = await Comments.find({ product_id: 6625d14202f0dd78c76d3566 }) -> [{
  product_id: "6625d14202f0dd78c76d3566",
  user_name: "Rafael",
  content: "Muy buen producto.",
  stars: 4.5
},
{
  product_id: "6625d14202f0dd78c76d3566",
  user_name: "Matias",
  content: "Muy buen producto, super recomendable",
  stars: 5
},
]

Product {
  name,
  category:{
    name: 
  }
  comments: comments
}


const comments = await Comments.find({ product_id: req.body.product_id });



exports.crearComentario = function(req, res) {
  var comentario = new Comentario({
    texto: req.body.texto,
    usuario: req.body.usuario,
    // más campos según sea necesario
  });

  comentario.save(function(err, comentarioGuardado) {
    if (err) return res.status(500).send(err);

    Producto.findById(req.body.productoId, function(err, producto) {
      if (err) return res.status(500).send(err);

      producto.comentarios.push(comentarioGuardado._id);[...product.comments, comentario_id]
      producto.save(function(err) {
        if (err) return res.status(500).send(err);

        res.status(200).send(comentarioGuardado);
      });
    });

*/
