//const path = require("path");

const express = require("express");

const utilController = require("../controllers/util");

const router = express.Router();

router.get("/:kindFilter", utilController.getFilter);

module.exports = router;
