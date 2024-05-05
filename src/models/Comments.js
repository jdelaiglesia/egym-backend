const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const CommentSchema = new mongoose.Schema({
  product_id: {
    type: ObjectId,
    ref: "product",
    required: true,
  },
  user: {
    type: ObjectId,
    ref: "user",
    required: true,
  },
  body: {
    type: String,
    maxlength: 150,
    required: true,
  },
  rating: {
    type: Number,
    max: 5,
    min: 0,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

const Comment = mongoose.model("comment", CommentSchema);

module.exports = Comment;
