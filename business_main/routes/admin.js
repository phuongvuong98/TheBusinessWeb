const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get("/", adminController.getIndex);

router.get("/users", adminController.getUser);

router.get("/edit-user/:userId", adminController.getEditUser);

router.post("/edit-user", adminController.postEditUser);

router.post("/deleteUser", adminController.postDeleteUser);

router.get("/products", adminController.getProducts);

router.get("/add-product", adminController.getAddProduct);

router.post("/add-product", adminController.postAddProduct);

router.get("/edit-product/:productId", adminController.getEditProduct);

router.post("/edit-product", adminController.postEditProduct);

router.post("/delete-product", adminController.postDeleteProduct);

router.get("/orders", adminController.getOrders);

//router.get("/add-orders", adminController.getAddOrders);

router.post("/add-orders", adminController.postAddOrders);

// router.get("/edit-orders/:orderId", adminController.getEditOrders);

// router.post("/edit-orders", adminController.postEditOrders);

// router.post("/delete-orders", adminController.postDeleteOrders);








// router.get('/products', adminController.getProducts);

// // /admin/add-product => POST
// router.post('/add-product', adminController.postAddProduct);

// router.get('/edit-product/:productId', adminController.getEditProduct);

// router.post('/edit-product', adminController.postEditProduct);

// router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
