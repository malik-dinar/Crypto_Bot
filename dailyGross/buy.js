const axios = require("axios");
const connectDb = require("./src/config/dbConnection");
const { buyCoins } = require("./src/utils/transaction");
require('dotenv').config();
connectDb();

function identifyBuyPoints(symbol, quantity) {
  axios
    .get(
      `${process.env.CURRENT_PRICE_URL}${symbol.toUpperCase()}`
    )
    .then(async (data) => {
      const currentPrice = data.data.price;
      buyCoins(symbol, quantity, currentPrice);
      console.log(`successfully buyed ${quantity} ${symbol}`);
    });
}

identifyBuyPoints("bnbusdt", 7);
