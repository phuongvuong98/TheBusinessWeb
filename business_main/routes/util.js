//const path = require("path");

const express = require("express");

const utilController = require("../controllers/util");

const router = express.Router();

router.get("/women", utilController.getWomen);

router.get("/men", utilController.getMen);

router.post("/women", utilController.postWomen);

router.post("/men", utilController.postMen);


module.exports = router;
