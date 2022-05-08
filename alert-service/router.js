const express = require("express");

const router = express.Router();

const Controller = require("./controller");

router.get("/alerts", Controller.GetAlerts);

router.post("/alert", Controller.CreateAlert);

module.exports = router;