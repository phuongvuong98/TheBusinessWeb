const Product = require("../models/product");

function postKind(newProd, kindFilter) {
   
};
exports.getWomen = (req, res, next) => {
    Product.find()
    .then(products => {
        // thay doi product tuy vao chuc nang
        console.log(products[0]);
        var newProd = products.filter(i => i.category == "women");
        // console.log(newProd);
        return res.render("shop/products", {
            path: "/product",
            pageTitle: "All products",
            products: newProd,
            kind: "women",
            kindFilter: [""]
        });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postWomen = (req, res, next) => {
    var kindFilter = req.body.kindFilter;
    var kindFilterEdit = req.body.kindFilterEdit;
    if (typeof kindFilter === 'string') {
        kindFilter = kindFilter.split(',');
    }
    kindFilter = kindFilter.filter(i => (i !== ""));
    kindFilter = kindFilter.filter(i => (i !== kindFilterEdit));

    Product.find()
        .then(products => {
            // thay doi product tuy vao chuc nang
            var newProd = products.filter(i => i.category == "women");

            if (kindFilter.includes("filter-P-0-50")) {
                newProd = newProd.filter(i => (parseFloat(i.price) >= 0 && parseFloat(i.price) <= 50));
            }
            if (kindFilter.includes("filter-P-50-100")) {
                newProd = newProd.filter(i => (parseFloat(i.price) >= 50 && parseFloat(i.price) <= 100));
            }
            if (kindFilter.includes("filter-P-100+")) {
                newProd = newProd.filter(i => (parseFloat(i.price) > 100));
            }
            if (kindFilter.includes("filter-SB-LH")) {
                newProd.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            }
            if (kindFilter.includes("filter-SB-HL")) {
                newProd.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            }
            return newProd;
        })
        .then(newProd => {
            if (kindFilter.length == 0) kindFilter.push("");
            console.log("kindFilter_new:", kindFilter);
            return res.render("shop/products", {
                path: "/products",
                pageTitle: "All products",
                products: newProd,
                kind: "women",
                kindFilter: kindFilter
            });
        })
        .catch(err => {
          console.log(err);
        });
};

exports.getMen = (req, res, next) => {
    Product.find()
    .then(products => {
        var newProd = products.filter(i => i.category == "men");
        return res.render("shop/products", {
            path: "/product",
            pageTitle: "",
            products: newProd,
            kind: "men",
            kindFilter: [""]
        });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postMen = (req, res, next) => {
    var kindFilter = req.body.kindFilter;
    var kindFilterEdit = req.body.kindFilterEdit;
    if (typeof kindFilter === 'string') kindFilter = kindFilter.split(',');
    kindFilter = kindFilter.filter(i => (i !== ""));
    kindFilter = kindFilter.filter(i => (i !== kindFilterEdit));

    Product.find()
        .then(products => {
            var newProd = products.filter(i => i.category == "men");
            if (kindFilter.includes("filter-P-0-50")) {
                newProd = newProd.filter(i => (parseFloat(i.price) >= 0 && parseFloat(i.price) <= 50));
            }
            if (kindFilter.includes("filter-P-50-100")) {
                newProd = newProd.filter(i => (parseFloat(i.price) >= 50 && parseFloat(i.price) <= 100));
            }
            if (kindFilter.includes("filter-P-100+")) {
                newProd = newProd.filter(i => (parseFloat(i.price) > 100));
            }
            if (kindFilter.includes("filter-SB-LH")) {
                newProd.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            }
            if (kindFilter.includes("filter-SB-HL")) {
                newProd.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            }
            return newProd;
        })
        .then(newProd => {
            if (kindFilter.length == 0) kindFilter.push("");
            console.log("kindFilter_new:", kindFilter);
            return res.render("shop/products", {
                path: "/products",
                pageTitle: "All products",
                products: newProd,
                kind: "men",
                kindFilter: kindFilter
            });
        })
        .catch(err => {
          console.log(err);
        });
};