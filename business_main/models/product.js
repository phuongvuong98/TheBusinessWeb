/* eslint-disable no-console */
const getDb = require("../util/database").getDb;

const mongoDb = require("mongodb");

class Product {
  constructor(title, description, price, imageUrl, id, userId) {
                this.title = title;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
    this._id = id ? new mongoDb.ObjectID(id) : null;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      dbOp = db
        .collection("products")
        .updateMany({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
      .then(results => {
        console.log(results);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then(products => {
        //console.log(products);
        return products;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(prodId) { // de dung Product.findById
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongoDb.ObjectID(prodId) })
      .next() //cai cuoi
      .then(product => {
        console.log(product);
        return product;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static deleteProd(prodId) {
    const db = getDb();

    return db
      .collection("products")
      .remove({
        _id: new mongoDb.ObjectID(prodId)
      })
      .then(results => {
        return results;
      })
      .catch(err => {
        console.log(err);
      });
  }
}

// // Tao 1 model duoc quan li boi sequelize 
// const Product = sequelize.define("Product",{
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     title: Sequelize.STRING,
//     price: {
//         type: Sequelize.DOUBLE,
//         allowNull: false
//     },
//     imageUrl: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     description: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// });

module.exports = Product;