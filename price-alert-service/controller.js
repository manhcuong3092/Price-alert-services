const axios = require('axios');
const ALERT_HOST = process.env.ALERT_HOST;
const COIN_HOST = process.env.COIN_HOST;

exports.Index = async (req, res) => {
    try {
        const getCoins = await axios.get(`${COIN_HOST}/coin`);
        const coins = getCoins.data;
        const getAlerts = await axios.get(`${ALERT_HOST}/alerts`);
        const alerts = getAlerts.data.alerts;

        console.log(coins);
        console.log(alerts);
        
        res.render('index', { coins, alerts, COIN_HOST, ALERT_HOST, title: 'Thông báo biến động giá.' });

    } catch (error) {
        console.log(error);
        return res.status(500).json(errorObject);
    }
};


exports.CreateAlert = async (req, res) => {
    try {
        let { asset, price, email, type } = req.body;

        const result = await axios.post(`${ALERT_HOST}/alert`, {
            asset, price, email, type
        });

        console.log(result);
        
        return res.send({ success: true, message: "Alert created" }); //Send response

    } catch (error) {
        console.log(error);
        return res.status(500).json(errorObject);
    }
};

