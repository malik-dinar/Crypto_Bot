const WebSocket = require("ws");
const connectDb = require("./src/config/dbConnection");
const {
  getBoughtQuantity,
  checkCoin,
  getSellQuantity,
} = require("./src/utils/transactionInfo");
const { sellCoins } = require("./src/utils/transaction");
connectDb();

function identifyBuyPoints(symbol, quantity) {
  const ws = new WebSocket(
    `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_1m`
  );
  ws.on("message", async (data) => {
    const coinAvailable = await checkCoin(symbol);
    if (!coinAvailable) {
      console.log("user doesnot have this coin to sell");
      return false;
    }
    const bougthQuantity = await getBoughtQuantity(symbol);
    const sellQuantity = await getSellQuantity(symbol);

    if ( bougthQuantity > quantity && bougthQuantity - sellQuantity > 0) {
      const { k } = JSON.parse(data);
      sellCoins(symbol, quantity, k.c);
      ws.close();
    } else {
      console.log("coin not buyed  / exceeded quantity");
      ws.close();
    }
  });
}

identifyBuyPoints("bnbusdt",29);
