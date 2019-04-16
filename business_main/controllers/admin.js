const Product = require("../models/product");


exports.getAddProduct = (req, res, next) => {
  // const product = new Product({
  //   name: "test1",
  //   category: "men",
  //   model:[{
  //     colour:[{
  //         name: "Green",
  //         imageUrl: "5cb55e61b9257e084a83979d"
  //     }],
  //     size:[{
  //         val: "XL",
  //         price: 100
  //     }]
  //   }],
  //   description: "huhu",
  //   userId: req.user
  // });
  // product.save();
  // console.log("Add get sucessfully");

  // var unirest = require('unirest');
  // unirest.get("https://systran-systran-platform-for-language-processing-v1.p.rapidapi.com/translation/text/translate?source=auto&target=vi&input=Never%20give%20up")
  // .header("X-RapidAPI-Host", "systran-systran-platform-for-language-processing-v1.p.rapidapi.com")
  // .header("X-RapidAPI-Key", "2f85eb9b04mshcc4dde50d754643p15ca1ejsn0ae51417a015")
  // .end(function (result) {
  //   console.log(result.status, result.headers, result.body);
  // });

  const translate = require("translate");
  const bar = translate('Home,shop,shopping cart,blog,cart', { to: 'vi', engine: 'google', key: 'AIzaSyA9oA2ivdWXD9aMEGdKLMIPFv3A_Vff2Ms' })
  .then(result => {
    console.log("GET TRANSLATE!");
    console.log(result);
  });
  


  res.redirect("/");
  // res.render("shop/index.ejs", {
  //   pageTitle: "Shop",
  //   path: "/",
  //   // editing: false
  // });

  // res.render("admin/edit-product", {
  //   pageTitle: "Add Product",
  //   path: "/admin/add-product",
  //   editing: false
  // });
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
