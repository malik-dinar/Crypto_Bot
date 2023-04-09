const axios = require("axios");
const connectDb = require("./src/config/dbConnection");
const {
  getBoughtQuantity,
  checkCoin,
  getSellQuantity,
} = require("./src/utils/transactionInfo");
const { sellCoins } = require("./src/utils/transaction");
connectDb();

function identifyBuyPoints(symbol, quantity) {
  axios
  .get(
    `https://api.binance.com/api/v3/ticker/price?symbol=${symbol.toUpperCase()}`
  ).
  then(async (data) => {
    const currentPrice = data.data.price;
    const coinAvailable = await checkCoin(symbol);
    if (!coinAvailable) {
      console.log("user doesnot have this coin to sell");
      return false;
    }
    const bougthQuantity = await getBoughtQuantity(symbol);
    const sellQuantity = await getSellQuantity(symbol);

    console.log(bougthQuantity  , sellQuantity);

    if ( bougthQuantity > quantity && bougthQuantity - sellQuantity > 0) {
      sellCoins(symbol, quantity, currentPrice );
    } else {
      console.log("coin not buyed  / exceeded quantity");
    }
  });
}

identifyBuyPoints("bnbusdt",1);
