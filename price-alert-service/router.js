const express = require("express");

const router = express.Router();

const Controller = require("./controller");

/* GET home page. */
router.get('/', Controller.Index);

router.post("/priceAlert", Controller.CreateAlert);

module.exports = router;