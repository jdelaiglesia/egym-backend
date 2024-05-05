const mongoose = require("mongoose");
const validateUser = require(".././validations/validateUser")

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
    required: false,
  },
  url_image: {
    type: String,
    required: false,
    detault: "https://cdn-icons-png.flaticon.com/512/8243/8243592.png",
  },
  dni: {
    type: Number,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  age: {
    type: Number,
    required: false,
  },
  rank: {
    type: Number,
    required: false,
    default: 0,
  },
  phone_number: {
    type: Number,
    required: false,
  },
  is_member : {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.validateUser = function(){
  const user = this
  return validateUser(user)
}

const User = mongoose.model("User", UserSchema);

module.exports = User;