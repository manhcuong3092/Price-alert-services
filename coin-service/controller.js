const coins = require('./coin');
const axios = require('axios');

exports.GetAllCoins = (req, res) => {
    return res.send(coins);
}

exports.GetOneCoin = async (req, res) => {
    try {
        let symbol = req.params.symbol;
        if(!symbol) {
            res.status(400).send({message: "Coin cannot be empty"});
            return;
        }
        symbol = symbol.toUpperCase()
        if(coins.indexOf(symbol) === -1) {
            res.status(400).send({message: "This coin does not exist"});
        }
        const result = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`);
        res.send({"symbol": symbol, "price": result.data.price});
    } catch (err) {
        res.send(err.message);
    }
}