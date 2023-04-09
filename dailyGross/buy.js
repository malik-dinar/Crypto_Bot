const axios = require("axios");
const connectDb = require("./src/config/dbConnection");
const { buyCoins } = require("./src/utils/transaction");
connectDb();

function identifyBuyPoints(symbol, quantity) {
  axios
    .get(
      `https://api.binance.com/api/v3/ticker/price?symbol=${symbol.toUpperCase()}`
    )
    .then(async (data) => {
      const currentPrice = data.data.price;
      buyCoins(symbol, quantity, currentPrice);
      console.log(`successfully buyed ${quantity} ${symbol}`);
    });
}

identifyBuyPoints("bnbusdt", 7);
