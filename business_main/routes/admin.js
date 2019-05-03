const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get("/", adminController.getIndex);

router.get("/user", adminController.getUser);

router.get("/add-user", adminController.getAddUser);

router.get("/products", adminController.getProducts);

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);
// // /admin/products => GET
// router.get('/products', adminController.getProducts);
router.get("/index", adminController.getUserList);
router.get("/user-edit", adminController.getUserEdit);
router.get("/user-detail", adminController.getUserDetail);
router.get("/product-list", adminController.getProductsList);
router.get("/product-edit", adminController.getProductsEdit);
router.get("/product-detail", adminController.getProductsDetail);

// // /admin/add-product => POST
// router.post('/add-product', adminController.postAddProduct);

// router.get('/edit-product/:productId', adminController.getEditProduct);

// router.post('/edit-product', adminController.postEditProduct);

// router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
