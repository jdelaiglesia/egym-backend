const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

const CommentSchema = new mongoose.Schema({
  productId: {
    type: ObjectId, 
    ref: 'product',
    required: true,
  },
  nameUser:{
    type: String,
    required: true,
  },
  content: {
    type: String,
    maxlength: 150,
    required: true,
  },
  stars:{
    type: Number,
    max: 5,
    min: 0,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  }
});

const Comment = mongoose.model("comment", CommentSchema);

module.exports = Comment;