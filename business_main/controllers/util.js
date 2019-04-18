const Product = require("../models/product");

exports.getFilter = (req, res, next) => {
    const kindFilter = req.params.kindFilter;
    console.log(kindFilter);
    
    Product.find()
    .then(products => {
        // thay doi product tuy vao chuc nang
        var newProd = [];
        if (kindFilter == "filter-P-0-50") {
            newProd = products.filter(i => (parseFloat(i.price) >= 0 && parseFloat(i.price) <= 50));
        }
        if (kindFilter == "filter-P-50-100") {
            newProd = products.filter(i => (parseFloat(i.price) >= 50 && parseFloat(i.price) <= 100));
        }
        if (kindFilter == "filter-P-100+") {
            newProd = products.filter(i => (parseFloat(i.price) > 100));
        }
        if (kindFilter == "filter-SB-LH") {
            products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            return products;
        }
        if (kindFilter == "filter-SB-HL") {
            products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            return products;
        }
        console.log("newProd:", newProd);
        return newProd;
    })
    .then(newProd => {
        return res.render("shop/products", {
            path: "/products",
            pageTitle: "All products",
            products: newProd
        });
    })
    .catch(err => {
      console.log(err);
    });
};