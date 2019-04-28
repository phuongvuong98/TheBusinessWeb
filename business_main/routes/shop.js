//const path = require("path");

const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

// router.get("/products/:productId", shopController.getProduct);

router.get("/cart", shopController.getCart);

router.get("/blog", shopController.getBlog);

router.get("/about", shopController.getAbout);

router.get("/contact", shopController.getContact);

router.get("/account", shopController.getAccount);

router.get("/register", shopController.getRegister);

// router.post("/cart", shopController.postCart);

// router.post("/cart-delete-item", shopController.postCartDeleteProduct);

// router.get("/orders", shopController.getOrders);

// router.post("/create-order", shopController.postCreateOrder);

module.exports = router;
