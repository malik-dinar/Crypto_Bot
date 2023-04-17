const WebSocket = require("ws");
const { sendMail } = require("./utils/mailService");
require('dotenv').config();

const identifyBuyPoints=(req,res)=> {
  const { coin } = req.params;
  const ws = new WebSocket(
    `${process.env.BUY_POINT_URL}${coin.toLowerCase()}@kline_1h`
  );
  let redCandlesCount = 0;
  ws.on("message", (data) => {
    const candle = JSON.parse(data).k;
    if (candle.o > candle.c) {
      redCandlesCount++;
      if (redCandlesCount >= 5) {
        sendMail(coin, redCandlesCount);
        res.send({ message: `Buy ${coin} now! It has witnessed ${redCandlesCount} continuous red hourly candles.` })
        redCandlesCount = 0;
        ws.close();
      }
    } else {
      redCandlesCount = 0;
    }
  });
}

module.exports ={ identifyBuyPoints }


