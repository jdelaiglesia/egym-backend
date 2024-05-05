const Sale = require("../models/Sale");
const User = require("../models/User");
const Product = require("../models/Product");
const Comments = require("../models/Comments");

const getStats = async (req, res) => {
  let stats = {
    sales: "",
    users: "",
    products: "",
  };
  try {
    stats.sales = await statsSales();

    stats.users = await statsUsers();

    stats.products = await statsProducts();

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const statsUsers = async () => {
  let stats = {
    total: 0,
    members: 0,
  };

  const users = await User.find({ deleted: false });
  users.map((u) => {
    stats.total++;
    u.is_member === true ? stats.members++ : null;
  });
  return stats;
};

const statsSales = async () => {
  let stats = {
    totalMoney: 0,
    totalSales: 0,
  };
  const sales = await Sale.find({ deleted: false, status: "completed" });
  for (let i = 0; i < sales.length; i++) {
    stats.totalMoney += sales[i].total;
    stats.totalSales++;
  }
  return stats;
};

const statsProducts = async () => {
  let stats = {
    bestSellers: [],
    bestsRating: [],
  };
  stats.bestSellers = await getBestSellers()

  stats.bestsRating = await getBestsRating()

  return stats;
};

const getBestsRating = async () => {
    const products = await Product.find({
        deleted: { $ne: true },
      }).populate("category");
    
      const ratedProducts = await Promise.all(
        products.map(async (product) => {
          const comments = await Comments.find({ product_id: product._id });
    
          let sum = 0;
          for (let i = 0; i < comments.length; i++) {
            sum += comments[i].rating;
          }
          const averageRating = comments.length > 0 ? sum / comments.length : 0;
    
          return {
            _id: product._id,
            name: product.name,
            url_image: product.url_image,
            averageRating,
          };
        })
      );
    
      return ratedProducts.sort((a, b) => b.averageRating - a.averageRating).slice(0, 3);
}

const getBestSellers = async () => {

    let productCounts = {};

    const sales = await Sale.find({
      deleted: false,
      status: "completed",
    }).populate({
      path: "products._id",
      model: "product",
      select: "_id name url_image",
    });
  
    sales.forEach((sale) => {
      sale.products.forEach((product) => {
        if (productCounts[product._id._id]) {
          productCounts[product._id._id].quantity += product.quantity;
        } else {
          productCounts[product._id._id] = {
            _id: product._id._id,
            name: product._id.name,
            url_image: product._id.url_image,
            quantity: product.quantity,
          };
        }
      });
    });
  
    return Object.values(productCounts).sort((a, b) => b.quantity - a.quantity).slice(0, 3);
}

module.exports = {
  getStats,
};
