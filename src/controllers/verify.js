const getVerify = (req, res) => {
  try {
    return res.status(200).json({ message: "Verified complete" });
  } catch (error) {
    return res.status(400).json({ message: "Verified failed" });
  }
};

module.exports = {
  getVerify,
};
