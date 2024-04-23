const Comment = require("../models/Comments");

const getCommentsProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const comments = await Comment.find({
      product_id: id,
      deleted: { $ne: true },
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postComment = async (req, res) => {
  const { product_id, username, body, rating } = req.body;
  if (!product_id || !username || !body || !rating) {
    return res.status(400).json({ message: "Incomplete information" });
  }
  try {
    const comment = new Comment({
      product_id,
      username,
      body,
      rating,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const id = req.params.id;
    const comment = await Comment.findById(id);
    if (!comment || comment.deleted) {
      return res.status(404).json({ message: "Comment not found" });
    } else {
      comment.deleted = true;
      await comment.save();
      return res.status(200).json({ message: "Comment deleted" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCommentsProduct,
  postComment,
  deleteComment,
};
