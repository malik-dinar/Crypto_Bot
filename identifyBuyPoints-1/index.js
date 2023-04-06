const WebSocket = require("ws");
const { sendMail } = require("./utils/mailService");

function identifyBuyPoints(symbol) {
  const ws = new WebSocket(
    `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_1h`
  );
  let redCandlesCount = 0;
  ws.on("message", (data) => {
    const candle = JSON.parse(data).k;
    if (candle.o > candle.c) {
      redCandlesCount++;
      if (redCandlesCount >= 5) {
        sendMail(symbol, redCandlesCount);
        redCandlesCount = 0;
        ws.close();
      }
    } else {
      redCandlesCount = 0;
    }
  });
}

identifyBuyPoints("bnbusdt");
