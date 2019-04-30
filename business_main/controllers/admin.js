const Product = require("../models/product");


exports.getAddProduct = (req, res, next) => {
  const product = new Product({
    name: "hot clothes ",
    category: "women",
    imageUrl:"https://ucarecdn.com/24adb98d-e833-4b75-bb62-35240f9a9d88/watches-10.jpg",
    price: "200",
    size:["XL","S","M","L"],
    description: "huhu",
    userId: req.user
  });
  product.save();
  console.log("Add get sucessfully");

  res.redirect("/");
};
exports.getUserList = (req, res, next) => {
  console.log("GET User list!");

  res.render("admin/user-list", {
      pageTitle: "user list",
      path: "/"
  });
};

exports.getUserEdit = (req, res, next) => {
  console.log("GET User edit!");

  res.render("admin/user-edit", {
      pageTitle: "user edit",
      path: "/"
  });
};


exports.getUserDetail = (req, res, next) => {
  console.log("GET User detail!");

  res.render("admin/user-detail", {
      pageTitle: "user detail",
      path: "/"
  });
};

exports.getProductsList = (req, res, next) => {
  console.log("GET Product List!");

  res.render("admin/product-list", {
      pageTitle: "product list",
      path: "/"
  });
};

exports.getProductsEdit = (req, res, next) => {
  console.log("GET Product Edit!");

  res.render("admin/product-edit", {
      pageTitle: "product edit",
      path: "/"
  });
};
exports.getProductsDetail = (req, res, next) => {
  console.log("GET Product Detail!");

  res.render("admin/product-detail", {
      pageTitle: "product detail",
      path: "/"
  });
};