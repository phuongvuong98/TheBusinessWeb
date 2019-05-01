const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
    Product.find()
    .then(products => {
      res.render('shop/products', {
        products: products,
        pageTitle: 'All Products',
        path: '/products',
        kind: "all",
        kindFilter: []
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    console.log("[GET DETAILED PRODUCT]==> OK");
    Product.findById(prodId)
        .then((product) => {
            //console.log("[GET DETAILED PRODUCT]==> OK");
            res.render("shop/product-detail", {
                product: product,
                pageTitle: product.title,
                path: "/products"
            });
        })
        .catch(err => {
            console.log(err)
        });
};

exports.getIndex = (req, res, next) => {
    Product.find()
    .then(products => {
      //console.log(products);
      res.render('shop/index', {
        products: products,
        pageTitle: 'Shop',
        path: '/',
        kind: "all",
        kindFilter: []
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
    // req.user
    //     .getCart()
    //     .then(products => {
	// 		console.log("TCL: exports.getCart -> products", products)
    //         res.render("shop/cart", {
    //             path: "/cart",
    //             pageTitle: "Your Cart",
    //             products: products
    //         });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
    res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart"
        //products: products
    });
};

exports.getBlog = (req, res, next) => {
    res.render("shop/blog", {
        path: "/blog",
        pageTitle: "Blog"
    });
};

exports.getAbout = (req, res, next) => {
    res.render("shop/about", {
        path: "/about",
        pageTitle: "About us"
    });
};

exports.getContact = (req, res, next) => {
    res.render("shop/contact", {
        path: "/contact",
        pageTitle: "Contact us"
    });
};

exports.getAccount = (req, res, next) => {
    res.render("shop/account", {
        path: "/account",
        pageTitle: "Your Account"
    });
};

exports.getRegister = (req, res, next) => {
    res.render("shop/register", {
        path: "/register",
        pageTitle: "Rigister"
    });
};
// // them san pham voi vao cart 
// exports.postCart = (req, res, next) => {    
//     const prodId = req.body.productId;
//     console.log("[ProdId]==>", prodId);
//     Product.findById(prodId)
//     .then(product => {
//         return req.user.addToCart(product);
//     })
//     .then(result => {
//         res.redirect("/cart");
//     })
// };

// exports.postCartDeleteProduct = (req, res, next) => {
//     const prodId = req.body.productId;
//     req.user
//         .deleteItemFromCart(prodId)
//         .then(result => {
//             console.log(result);
//             res.redirect("/cart");
//         })
//         .catch(err => {
//             console.log(err);
//         });
// };

// exports.postCreateOrder = (req, res, next) => {
//     // truy cap vao 1 user
//     req.user
//         .addOrder()
//         .then(() => {
//             return res.redirect("/cart");
//         })
//         .catch(err => {
//             console.log(err);
//         });
// };

// exports.getOrders = (req, res, next) => {
//     req.user
//         // truy cap bang product trong cart (1 user co nhieu ORDER)
//         .getOrders()
//         .then(orders => {
//             res.render("shop/orders", {
//                 path: "/orders",
//                 pageTitle: "Your Orders",
//                 orders: orders
//             });
//         })
//         .catch(err => {
//             console.log(err);
//         });
// };