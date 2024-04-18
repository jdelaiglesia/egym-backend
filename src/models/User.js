const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dni: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  rank: {
    type: Number,
    required: false,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  is_member : {
    type: Boolean,
    default: false,
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;