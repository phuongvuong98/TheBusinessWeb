const Product = require("../models/product");


exports.getAddProduct = (req, res, next) => {
<<<<<<< HEAD
  const product = new Product({
    name: "Fall star",
    category: "women",
    imageUrl: "https://ucarecdn.com/d554e2c4-0ce0-4658-a207-093f8dfff54a/product-07.jpg",
    price: "159",
    size: ["XL", "M", "L", "S"],
    description: "huhu",
    userId: req.user
  });
  product.save();
  console.log("Add get sucessfully");
=======
  for(let i = 1; i <= 10; i++){
    const product = new Product({
      name: "Bag " + i.toString(),
      category: "bag",
      imageUrl:"https://ucarecdn.com/9a56e72d-841b-4cb2-8ef2-688fee9b4baf/product-01.jpg",
      price: "120",
      size:["XL","S","M","L"],
      description: "huhu",
      userId: req.user
    });
    product.save();
    console.log("Add get sucessfully");
  }
>>>>>>> 9b4f999d7b44d45272af715c28abbb8aeba9f8e3

  res.redirect("/");
};

// exports.postAddProduct = (req, res, next) => {
//   console.log("Add post sucessfully");
//   const title = req.body.title;
//   const imageUrl = req.body.imageUrl;
//   const price = req.body.price;
//   const description = req.body.description;

//   const product = new Product(
//     title,
//     description,
//     price,
//     imageUrl,
//     null,
//     req.user._id
//   );

//   product
//     .save()
//     .then(results => {
//       //console.log(results);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

// exports.getEditProduct = (req, res, _next) => {
//   // nhan id de chinh sua
//   const editMode = req.query.edit;

//   console.log("EditMode:", editMode);
//   if (!editMode) {
//     return res.redirect("/");
//   }
//   const prodId = req.params.productId;

//   // req.user.getProducts tra ve mang product, USER 1 LAY RA CAC PRODUCT CUA NO
//   // req.user.getProducts({where: {id: prodId}})
//   //Product.findById(prodId)
//   Product.findById(prodId)
//     .then(product => {
//       //console.log(product);
//       if (!product) {
//         return res.redirect("/");
//       }
//       res.render("admin/edit-product", {
//         pageTitle: "Edit Product",
//         path: "/admin/edit-product",
//         editing: editMode,
//         product: product
//       });
//     })
//     .catch(err => console.log(err));
// };

// exports.postEditProduct = (req, res, _next) => {
//   const prodId = req.body.productId;
//   const updatedTitle = req.body.title;
//   const updatedPrice = req.body.price;
//   const updatedImageUrl = req.body.imageUrl;
//   const updatedDesc = req.body.description;

//   const product = new Product(
//     updatedTitle,
//     updatedDesc,
//     updatedPrice,
//     updatedImageUrl,
//     prodId
//   );
//   product
//     .save()
//     .then(() => {
//       console.log("OK");
//       res.redirect("/admin/products");
//     })
//     .catch(err => console.log(err));
// };

// exports.getProducts = (_req, res, _next) => {
//   Product.fetchAll()
//     .then(products => {
//       res.render("admin/products", {
//         prods: products,
//         pageTitle: "Admin Products",
//         path: "/admin/products"
//       });
//     })
//     .catch(err => console.log(err));
// };

// exports.postDeleteProduct = (req, res, _next) => {
//   const prodId = req.body.productId;
//   Product.deleteProd(prodId)
//     .then(results => {
//       console.log("=====> [OK]");
//       res.redirect("/admin/products");
//     })
//     .catch(err => console.log(err));
// };
