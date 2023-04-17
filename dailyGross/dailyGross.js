const axios = require("axios");
const {
  getBuyedDatas,
  getSelledDatas,
  checkCoin,
} = require("./src/utils/transactionInfo");
const { sumOfAnArray } = require("./src/utils/helpers");
require("dotenv").config();

const dailyGross = async (req,res) => {
  const { coin } = req.params;
  console.log(coin);
  const coinAvailable = await checkCoin(coin);
  if (!coinAvailable) {
    return console.log("You dont have this coin to check the profit");
  }

  axios
    .get(`${process.env.CURRENT_PRICE_URL}${coin.toUpperCase()}`)
    .then(async (response) => {
      const currentPrice = response.data.price;
      const buyedDatas = await getBuyedDatas();
      const selledDatas = await getSelledDatas();

      const soldCoinsWithinPurchasedCoins = buyedDatas.splice(0,selledDatas.length);
      const unsoldCoinsWithinPurchasedCoins = buyedDatas;

      const profit1 = sumOfAnArray(selledDatas) - sumOfAnArray(soldCoinsWithinPurchasedCoins);
      const profit2 = currentPrice * unsoldCoinsWithinPurchasedCoins.length - sumOfAnArray(unsoldCoinsWithinPurchasedCoins);

      const dailyGross = profit1 + profit2;

      console.log(currentPrice);
      if (dailyGross > 0) {
        console.log(`profit = ${dailyGross}`);
      } else if (dailyGross === 0) {
        console.log("No profit and no loss as of now");
      } else {
        console.log(`loss = ${dailyGross}`);
      }
    })
    .catch((error) => {
      console.error("error");
    });
};

module.exports = { dailyGross }
