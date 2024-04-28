const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const auth = req.get("authorization") ? req.get("authorization") : "no-token";

  const token = auth.toLowerCase().startsWith("bearer") 
    ? auth.substring(7)
    : false;

  try {
    jwt.verify(token, process.env.SECRET);
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ error: error.message });
  }

  const decodedToken = jwt.verify(token, process.env.SECRET);

  req.user_id = decodedToken.id;

  next();
};

module.exports = { verifyJWT };

// ---------------------------------------
