const Product = require("../models/product");
const User = require("../models/user");

exports.getIndex = (req, res, next) => {
  res.render("admin/index", {
      pageTitle: "Admin Page",
      path: "/"
  });
};

exports.getUser = (req, res, next) => {
  User.find()
  .then(users => {
    //console.log(users);
    res.render("admin/user-list", {
      pageTitle: "ALL USERS",
      users: users
  });
  })
};

exports.getEditUser = (req, res, next) => {
  const userId = req.params.userId;
  console.log("TCL: exports.getEditUser -> userId", userId);
  
  User.findById(userId)
  .then(user => {
    if (!user) {
      return res.redirect("/admin");
    }
    res.render("admin/user-edit", {
      pageTitle: "Edit user",
      user: user
    });
  })
  .catch(err => {
		console.log("TCL: exports.getEditUser -> err", err)
  });
};

exports.postEditUser = (req, res, next) => {
  const userId = req.body.userId;
  const emailUp = req.body.email;
  const birthdayUp = req.body.birthday;
  const phoneUp = req.body.phone;
  const roleUp = req.body.role;
  const addressUp = req.body.address;
  const delete_atUp = req.body.delete_at;
  const image = req.file;
  
	console.log("TCL: exports.postEditUser -> image", image);
  console.log("TCL: exports.postEditUser -> userId", userId);
  
  User.findById(userId)
  .then(user => {
    user.email = emailUp;
    user.birthday = birthdayUp;
    user.phone = phoneUp;
    user.role = roleUp;
    user.address = addressUp;
    user.delete_at = delete_atUp;
    user.update_at = Date();

    if (image) {
      user.imageUrl = "/" + image.path;
    } else {
      user.imageUrl = "https://ucarecdn.com/5d276379-552f-4a08-97e7-744a15f71477/ava.png";
    }

    return user.save();
  })
  .then(result => {
    console.log("Updated user!");
    return res.redirect("/admin/users");
  })
  .catch(err => {
		console.log("TCL: exports.getEditUser -> err", err)
  });
};

exports.postDeleteUser = (req, res, next) => {
  const userId = req.body.userId;
  const delete_atUp = new Date();
	console.log("TCL: exports.postDeleteUser -> delete_atUp", delete_atUp)
  
  User.findById(userId)
  .then(user => {
    user.delete_at = delete_atUp;
    return user.save();
  })
  .then(result => {
    console.log("Deleted user!");
    return res.redirect("/admin/users");
  })
  .catch(err => {
		console.log("TCL: exports.postDeleteUser -> err", err)
  });
};

exports.getProducts = (req, res, next) => {
  Product.find()
  .then(products => {
    //console.log(products);
    res.render("admin/product-list", {
      pageTitle: "ALL PRODUCTS",
      products: products
  });
  })
};

exports.getAddProduct = (req, res, next) => {
  res.render("admin/product-add", {
    pageTitle: "Add Product",
    path: "/"
});
};

exports.getOrders = (req, res, next) => {
  res.render("admin/order-list", {
      pageTitle: "All Orders",
      path: "/"
  });
};