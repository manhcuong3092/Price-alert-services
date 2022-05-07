const express = require("express");
var coins = require("./coin");

const router = express.Router();

const Controller = require("./controller");

router.get("/coin", Controller.GetAllCoins);

router.get("/coin/:symbol", Controller.GetOneCoin);

module.exports = router;