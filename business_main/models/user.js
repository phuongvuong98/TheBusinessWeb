const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  address: {
    type: String,
    require: true
  },
  birthday: {
    type: String,
    require: true
  },
  commentBox: {
    //items: [{productId:"sss",comment:"huhu"}]
    items: []
  },
  imageUrl: {
    type: String
  },
  create_at: {
    type: Date,
    default: Date.now
  },
  update_at: {
    type: Date
  },
  delete_at: {
    type: Date
  },
  role: {
    type: String,
    default: "user"
  },
  cart: {
    items: []
  }
})

module.exports = mongoose.model("User", userSchema);

