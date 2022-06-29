const axios = require('axios');
const ALERT_HOST = process.env.ALERT_HOST;
const COIN_HOST = process.env.COIN_HOST;
const NGINX_HOST = process.env.NGINX_HOST;

exports.Index = async (req, res) => {
    try {
        const getCoins = await axios.get(`${COIN_HOST}/coin`);
        const coins = getCoins.data;
        const getAlerts = await axios.get(`${ALERT_HOST}/alerts`);
        const alerts = getAlerts.data.alerts;

        console.log(coins);
        console.log(alerts);
        
        res.render('index', { coins, alerts, COIN_HOST, ALERT_HOST, NGINX_HOST, title: 'Thông báo biến động giá.' });

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};


exports.CreateAlert = async (req, res) => {
    try {
        let result;
        try {
            result = await axios.post(`${ALERT_HOST}/alert`, req.body);
        } catch (err) {
            return res.status(400).send({success: false, message: err.response.data.message});
        }

        console.log(result);
        
        return res.send({ success: true, message: "Alert created" }); //Send response

    } catch (error) {
        console.log(error);
        return res.status(500).json("Error");
    }
};

