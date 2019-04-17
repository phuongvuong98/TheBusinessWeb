const Product = require("../models/product");

// User duoc tao ra tu models/user de thuc hien cau leng tao bang thong qua method sync o app.js
// const User = require("../models/user");

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            //console.log("[GET ALL PRODUCT]==> OK");
            res.render("shop/product-list", {
                prods: products,
                pageTitle: "All Products",
                path: "/products"
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
    // Product.fetchAll()
    //     .then(products => {
    //         // console.log("[CHECK ALL PROD]==> OK");
    //         // res.render("shop/index", {
    //         //     prods: products,
    //         //     pageTitle: "Shop",
    //         //     path: "/"
    //         // });
    //         res.render("index.ejs", {
    //             prods: products,
    //             pageTitle: "Shop",
    //             path: "/"
    //         });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });

    console.log("GET index!");

    res.render("shop/index", {
        pageTitle: "Shop",
        path: "/"
    });
};

exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then(products => {
			console.log("TCL: exports.getCart -> products", products)
            res.render("shop/cart", {
                path: "/cart",
                pageTitle: "Your Cart",
                products: products
            });
        })
        .catch(err => {
            console.log(err);
        });
};

// // them san pham voi vao cart 
exports.postCart = (req, res, next) => {    
    const prodId = req.body.productId;
    console.log("[ProdId]==>", prodId);
    Product.findById(prodId)
    .then(product => {
        return req.user.addToCart(product);
    })
    .then(result => {
        res.redirect("/cart");
    })
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .deleteItemFromCart(prodId)
        .then(result => {
            console.log(result);
            res.redirect("/cart");
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postCreateOrder = (req, res, next) => {
    // truy cap vao 1 user
    req.user
        .addOrder()
        .then(() => {
            return res.redirect("/cart");
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getOrders = (req, res, next) => {
    req.user
        // truy cap bang product trong cart (1 user co nhieu ORDER)
        .getOrders()
        .then(orders => {
            res.render("shop/orders", {
                path: "/orders",
                pageTitle: "Your Orders",
                orders: orders
            });
        })
        .catch(err => {
            console.log(err);
        });
};