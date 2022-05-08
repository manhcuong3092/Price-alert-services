const express = require("express");

const router = express.Router();

const Controller = require("./controller");

router.post("/notice-sender", Controller.SendEmail);

module.exports = router;