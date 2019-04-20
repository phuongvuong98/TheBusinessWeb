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