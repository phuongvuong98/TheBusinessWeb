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


// class User {
//   constructor(username, email, cart, id) {
//     this.name = username;
//     this.email = email;
//     this.cart = cart; // cart = {[items: {}]}
//     this._id = id;
//   }

//   save() {
//     const db = getDb();
//     return db
//       .collection("users")
//       .insertOne(this)
//       .then(results => {
//         console.log(results);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   addToCart(product) {
//     // khoi tao cart item.

//     // if (!this.cart.hasOwnProperty(items)) {
//     //   this.cart.items = {};
//     // }

//     let newQuantity = 1;
//     let updateCartItems = [...this.cart.items];

//     const cartProductIndex = this.cart.items.findIndex(cp => {
//       return cp.prodId.toString() === product._id.toString();
//     });

//     if (cartProductIndex >= 0) {
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//       updateCartItems[cartProductIndex].quantity = newQuantity;
//     } else {
//       updateCartItems.push({
//         prodId: new objectId(product._id),
//         quantity: 1
//       });
//     }

//     //...qq: tach qq ra
//     const updateCart = {
//       items: updateCartItems
//     };

//     // const updateCart = { items: [{prodId: product._id, quantity: 1}]};
//     console.log("TCL: User -> addToCart -> updateCart", updateCart);

//     const db = getDb();
//     return db.collection("users")
//       .updateOne(
//         { _id: new objectId(this._id) },
//         { $set: { cart: updateCart } }
//       )
//   }

//   getCart() {
//     const db = getDb();

//     const productIds = this.cart.items.map(i => {
//       return i.prodId;
//     });
//     console.log("TCL: User -> getCart -> productIds", productIds);
//     return db
//       .collection("products")
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then(products => {
//         return products.map(p => {
//           return {
//             ...p,
//             quantity: this.cart.items.find(i => {
//               console.log("TCL: User -> getCart -> i", i);
//               return i.prodId.toString() === p._id.toString();
//             }).quantity
//           };
//         });
//       });
//   }

//   deleteItemFromCart(productId) {
//     const updateCartItems = this.cart.items.filter(item => {
//       // return true thi giu no lai, false thi bo no di
//       return item.prodId.toString() !== productId.toString();
//     });
//     const db = getDb();
//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new objectId(this._id) },
//         { $set: { cart: { items: updateCartItems } } }
//       );
//   }

//   addOrder() {
//     // vi lich su order rat nhieu nen lam 1 bang rieng de quan li
//     // them cac lien ket cua order voi user va cart
//     const db = getDb();
//     return this.getCart()
//       .then(products => {
// 				console.log("TCL: User -> addOrder -> products", products)
//         const order = {
//           items: products,
//           user: {
//             _id: new objectId(this._id),
//             name: this.name,
//             email: this.email
//           }
//         };
//         return db.collection("orders")
//       .insertOne(order);
//       })
//       .then(result => {
//         this.cart = {items: []};
//         return db.collection("users")
//           .updateOne(
//             { _id: new objectId(this._id) },
//             { $set: { cart: { items: [] } } }
//           );
//       })
//   }
  
//   getOrders() {
//     const db = getDb();
//     return db.collection("orders")
//       .find({"user._id" : new objectId(this._id)})
//       .toArray()
//   }

//   static findById(userId) {
//     const db = getDb();
//     return db
//       .collection("users")
//       .findOne({ _id: new objectId(userId) })
//       .then(product => {
//         console.log(product);
//         return product;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
// }

// module.exports = User;
