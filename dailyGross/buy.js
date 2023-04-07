const WebSocket = require("ws");
const connectDb = require("./src/config/dbConnection");
const { buyCoins } = require("./src/utils/transaction");
connectDb()

function identifyBuyPoints(symbol,quantity) {
  const ws = new WebSocket(
    `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_1m`
  );
  ws.on("message", async(data) => {
    const { k } = JSON.parse(data);
    buyCoins(symbol,quantity,k.c)
    ws.close();
  });
}

identifyBuyPoints("bnbusdt",7);
