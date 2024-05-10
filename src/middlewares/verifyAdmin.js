const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
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

  console.log(decodedToken);

  try {
    if (decodedToken.rank === 10) {
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { verifyAdmin };

// ---------------------------------------
