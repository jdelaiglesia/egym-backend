const Product = require("../models/Product");

const getAllProducts = async (req, res)=>{
 try {
     const getAll = await Product.find({available: true})
     res.status(200).json(getAll)
 } catch (error) {
    res.status(500).json({ message: error.message });
 }   
}
module.exports = getAllProducts