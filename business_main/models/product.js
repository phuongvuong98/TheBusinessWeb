const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: String,
  category: String,
  imageUrl: String,
  price: Number,
  size: [],
  description: String,
  create_at: {
    type: Date,
    require: true
  },
  update_at: {
    type: Date
  },
  delete_at: {
    type: Date
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  strict: false
});

module.exports = mongoose.model('Product', ProductSchema);