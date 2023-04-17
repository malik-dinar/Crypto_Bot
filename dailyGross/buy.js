const axios = require("axios");
const { buyCoins } = require("./src/utils/transaction");
require("dotenv").config();

const buyCoin = (req, res) => {
  try {
    const { coin, quantity } = req.body;
    axios
      .get(`${process.env.CURRENT_PRICE_URL}${coin.toUpperCase()}`)
      .then(async (data) => {
        const currentPrice = data.data.price;
        buyCoins(coin, quantity, currentPrice);
        res.send({ message: `successfully buyed ${quantity} ${coin}` });
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { buyCoin };
