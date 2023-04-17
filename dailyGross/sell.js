const axios = require("axios");
const {
  getBoughtQuantity,
  checkCoin,
  getSellQuantity,
} = require("./src/utils/transactionInfo");
const { sellCoins } = require("./src/utils/transaction");
require("dotenv").config();

const sellCoin = (req, res) => {
  const { coin, quantity } = req.body;
  axios
    .get(`${process.env.CURRENT_PRICE_URL}${coin.toUpperCase()}`)
    .then(async (data) => {
      const currentPrice = data.data.price;
      const coinAvailable = await checkCoin(coin);
      if (!coinAvailable) {
        res.send({ message: "user doesn't have this coin to sell" });
        return false;
      }
      const bougthQuantity = await getBoughtQuantity(coin);
      const sellQuantity = await getSellQuantity(coin);

      if (bougthQuantity >= quantity && bougthQuantity - sellQuantity > 0) {
        sellCoins(coin, quantity, currentPrice);
        res.send({ message: `successfully selled ${quantity} ${coin}` });
      } else {
        res.send({ message: "coin not buyed  / exceeded quantity" });
      }
    })
    .catch((error) => {
      console.error("error");
    });
};

module.exports = { sellCoin };
