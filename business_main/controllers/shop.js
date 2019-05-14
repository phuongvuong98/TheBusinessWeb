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
            console.log("Get product successfully");
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
        let products = user.cart.items;
        console.log(products);
        res.render("shop/cart", {
          path: "/cart",
          pageTitle: "Your Cart",
          products: products,
          sum: user.cart.sum
        });
      })
      .catch(err => console.log(err));
};

exports.getJsonCart = (req, res, next) => {
    req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then(user => {
        res.json({
            "sumPrice" : user.cart.sum,
            "products": user.cart.items
        })
    })
    .catch(err => console.log(err));

};

// them san pham voi vao cart 
exports.postCart = (req, res, next) => {   
    console.log("Add Product to Cart");
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
    const btnUpdateCart = req.body.btnUpdateCart;
    const btnCheckout = req.body.btnCheckout;

    const newQuantityArr = req.body.productNum;
    const productIdArr = req.body.productId;

    console.log("Update cart and checkout");
    console.log(btnUpdateCart);
    console.log(btnCheckout);
    console.log(newQuantityArr);
    console.log(newQuantityArr);

    let newCouple = [];

    if (typeof productIdArr === "undefined"){
        return res.redirect("/cart");
    }
    for (let i = 0; i < productIdArr.length; i++) {
        newCouple.push({
            productId: productIdArr[i],
            newQuantity: newQuantityArr[i]
        })
    }
    console.log("TCL: exports.postUpdateCart -> newCouple", newCouple)
	console.log("TCL: exports.postUpdateCart -> productIdArr", productIdArr)
	console.log("TCL: exports.postUpdateCart -> btnUpdateCart", btnUpdateCart)
    
    if (btnUpdateCart == '1') {
        console.log("[SHOP CONTROLLER] Update Cart");

        let promiseUpdateCart = new Promise(function (resolve, reject){
            resolve(req.user.updateCart(newCouple))
        });

        //Please use timeout > 3s to save Db successfully
        promiseUpdateCart.then(function(rs){
            setTimeout(function () {
                return res.redirect("/cart");
            }, 3000)
        });
    }

    if (btnCheckout == 1){
        console.log("[SHOP CONTROLLER] Checkout Cart");

        let oderPromise = new Promise(function (resolve, reject) {
            resolve(req.user.orderProduct());
        });

        //Please use timeout > 3s to save Db successfully
        oderPromise.then(function() {
            setTimeout(function() {
                return res.redirect("/cart");
            }, 3000);
        });
    }

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

exports.getRegister = (req, res, next) => {
    res.render("shop/register", {
        path: "/register",
        pageTitle: "Rigister"
    });
};

exports.searchProduct = (req, res, next) => {
    var namep = req.body.search;
    //var regex = RegExp(".*" + namep + ".*");

    Product.find({
            name: {
                $regex: namep,
                $options: 'i'
            }
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