const axios = require("axios");
const {
  getBuyedDatas,
  getSelledDatas,
  checkCoin,
} = require("./src/utils/transactionInfo");
const connectDb = require("./src/config/dbConnection");
const { sumOfAnArray } = require("./src/utils/helpers");
connectDb();

const dailyGross =async (coin) => {
    const coinAvailable = await checkCoin(coin);
    if(coinAvailable){
        axios
        .get(
          `https://api.binance.com/api/v3/ticker/price?symbol=${coin.toUpperCase()}`
        )
        .then(async (response) => {  
          const currentPrice = response.data.price;
          const buyedDatas = await getBuyedDatas();
          const selledDatas = await getSelledDatas();

          const divIndex = selledDatas.length;
          const selledCoinsInsideBuyedDatas = buyedDatas.splice(0, divIndex);
          const unSelledCoinsInsideBuyedDatas = buyedDatas;
          const quantity=unSelledCoinsInsideBuyedDatas.length
    
          const buyedPrice = sumOfAnArray(selledCoinsInsideBuyedDatas);
          const selledPrice = sumOfAnArray(selledDatas);
          const sumOfcurrentlyAvailableCoins = sumOfAnArray(unSelledCoinsInsideBuyedDatas);
        
          const profit1 = selledPrice-buyedPrice; 
          const profit2 = (currentPrice*quantity) - sumOfcurrentlyAvailableCoins;

          const dailyGross = profit1 + profit2;

          if(dailyGross>0){
            console.log(currentPrice);
            console.log(`profit = ${dailyGross}`);
          }else{
            console.log(`loss = ${dailyGross}`);
          }
        })
        .catch((error) => {
          console.error("error");
        });   
    }else{
        console.log('You dont have this coin to check the price');
    }
};
dailyGross("bnbusdt");
