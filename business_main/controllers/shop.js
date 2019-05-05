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
    const productId = req.params.productId;
    console.log("[GET DETAILED PRODUCT]:", productId);

    Product.find()
    .then(products => {
        Product.findById(productId)
        .then((product) => {
            console.log("Get product sucessfully");
            res.render("shop/product-detail", {
                product: product,
                products: products,
                pageTitle: product.title,
                path: "/products"
            });
        })
        .catch(err => {
            console.log(err)
        });
    })
    .catch(err => {
        console.log(err);
    })
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
    req.user
      .populate("cart.items.productId")
      .execPopulate()
      .then(user => {
        const products = user.cart.items;
        // console.log(products);
        // console.log(user.cart.sum);
        
        res.render("shop/cart", {
          path: "/cart",
          pageTitle: "Your Cart",
          products: products,
          sum: user.cart.sum
        });
      })
      .catch(err => console.log(err));
};

// them san pham voi vao cart 
exports.postCart = (req, res, next) => {   
    console.log("HUHUHU1"); 
    const productId = req.body.productId;
    var newQuantity = req.body.productNumber; 
    
    Product.findById(productId)
    .then(product => {
        return req.user.addToCart(product, newQuantity);
    })
    .then(result => {
        res.redirect("/cart");
    })
};

exports.postUpdateCart = (req, res, next) => {    
    // const productId = req.body.productId;
    console.log("HUHUHU2");
    var newQuantity = req.body.productNum; 
	console.log("TCL: exports.postUpdateCart -> newQuantity", newQuantity);
	console.log("TCL: exports.postUpdateCart -> newQuantity", req.body);
    
    res.redirect("/");

    // Product.findById(productId)
    // .then(product => {
    //     return req.user.addToCart(product, newQuantity);
    // })
    // .then(result => {
    //     res.redirect("/cart");
    // })

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
exports.searchProduct = (req, res, next) => {
    var namep = req.body.search;
    //var regex = RegExp(".*" + namep + ".*");

    Product.find({
            name: {
                $regex: namep,
                $options: 'i'
            }
            //  $or: [
            //     {
            //         name: {
            //         $regex: namep,
            //         $options: 'i'
            //         }
            //     },
            //     {
            //         price: namep
            //     }
            // ]

        })
        .then(products => {
            res.render('shop/search', {
                products: products,
                pageTitle: 'Result of ' + namep,
                path: '/products',
                kind: "all",
                kindFilter: []
            });
        })
        .catch(err => {
            console.log(err);
        });
};