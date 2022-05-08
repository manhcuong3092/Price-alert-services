var alerts = require('./alerts');
const axios = require('axios');
const {errorObject} = require('./config');
const COIN_HOST = process.env.COIN_HOST;

exports.CreateAlert = async (req, res) => {
    try {
        let { asset, price, type, notice_type, email, telegram, discord } = req.body;

        const result = await axios.get(`${COIN_HOST}/coin`);
        const coins = result.data;

        if (!asset || !price || !type || !notice_type)   //Check whether all the fields are passed
            return res.status(400).json({
                error: true,
                message: "Please provide the required fields",
            });

        asset = asset.toUpperCase()
        if(coins.indexOf(asset) === -1) {
            return res.status(400).json({
                error: true,
                message: "This coin doesn't exist.",
            });
        }

        if(isNaN(price)) {
            return res.status(400).json({
                error: true,
                message: "Invalid price",
            });
        }

        price = parseFloat(price);
        if(price <= 0) {
            return res.status(400).json({
                error: true,
                message: "Invalid price",
            });
        }

        if(type.toLowerCase() !== "above" && type.toLowerCase() !== "below") {
            return res.status(400).json({
                error: true,
                message: "Type must be above or below",
            });
        }
        let alert = {
            asset,
            price,
            type,
            notice_type,
            createdAt: new Date()
        }

        if(email && notice_type === 'email') {
            alert.email = email;
        } else if(discord && notice_type === 'discord') {
            alert.discord = discord;
        } else if(telegram && notice_type === 'telegram') {
            alert.telegram = telegram;
        } else {
            return res.status(400).json({
                error: true,
                message: "Invalid notice type",
            });
        }

        // Create alert by pushing the object to the alerts array.
        alerts.push(alert);

        return res.send({ success: true, message: "Alert created" }); //Send response

    } catch (error) {
        console.log(error);
        return res.status(500).json(errorObject);
    }
};

exports.GetAlerts = async (req, res) => {
    return res.send({ success: true, alerts: alerts });
};