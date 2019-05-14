const mongoose = require("mongoose");

const Product = require("../models/product");

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
  phone: {
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
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: { type: Number}
      }
    ],
    sum: {
      type: Number,
      default: 0
    }
  },
  productOrder: []
});

userSchema.methods.addToCart = function(product, newQuantity) {
  const cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.productId.toString() === product._id.toString();
  });
  
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + newQuantity;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity
    });
  }
  this.cart.sum = this.cart.sum + product.price * newQuantity;
  console.log("TCL: userSchema.methods.addToCart -> updatedCartItems", updatedCartItems)
  const updatedCart = {
    items: updatedCartItems,
    sum: this.cart.sum
  };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.updateCart = function(newCouple) {
  var updatedCartItems = [...this.cart.items]; // Change const -> var to change value index
  var newSum = 0;
  Product.find()
  .then(products => {
    updatedCartItems.forEach((element, index) => {
      products.forEach(item => {
        if (item._id.toString() == updatedCartItems[index].productId.toString()) {
          for (let i = 0; i < newCouple.length; i++) {
            if (newCouple[i].productId.toString() == updatedCartItems[index].productId.toString()) {
              updatedCartItems[index].quantity = newCouple[i].newQuantity;
              newSum = newSum + parseFloat(item.price) * parseFloat(newCouple[i].newQuantity);
              console.log("BenTrong: userSchema.methods.updateCart -> newSum", newSum);  
            }
          }
        }
      })
    });
    return newSum;
  })
  .then(newSum => {
    console.log("Final: userSchema.methods.updateCart -> newSum", newSum);
    const updatedCart = {
      items: updatedCartItems,
      sum: newSum
    };
    console.log("Object cart: ");
    console.log(JSON.stringify(updatedCart))
    this.cart = updatedCart;
    return this.save();
  })

};

// Order product, complete save product from cart to order
userSchema.methods.orderProduct = function() {
  let itemsCart = JSON.parse(JSON.stringify(this.cart));
  // let productOrder = this.productOrder
  this.productOrder.unshift(itemsCart);
  // console.log(productOrder);
  // this.productOrder = productOrder;
  this.cart = {
    items: [],
    sum: 0
  };
  console.log("[USER MODEL] productOrder and cart: ");
  console.log(this.productOrder);
  console.log(this.cart);
  return this.save();

};


module.exports = mongoose.model("User", userSchema);