# Crypto-Bot

This project aims to build a cryptocurrency trading bot that can perform various trading activities. The project is divided into two tasks, each with its own specific objectives.

## Identify Buy Points
The objective of this task is to write a function that can identify potential buy points in cryptocurrencies. This is achieved by taking candlestick data from Binance and sending updates to customers via email. The buy point criteria are defined as the point where the particular cryptocurrency has witnessed 5 continuous red hourly candles.

## Determine Optimal Sell Points
The objective of this task is to use back-testing to determine the percentage decrease of a cryptocurrency when it is likely to pick back up. This is achieved by taking data of the last one year (hourly candles), grouping the continuous red price movement in buckets, and finding their median.

## Calculate Profit & Loss
The objective of this task is to calculate the profit and loss of all transactions made during the day, even if multiple orders for one or more coins have not been completed


## Run Locally

Clone the project

```bash
  https://github.com/malik-dinar/Crypto_Bot.git
```
Install dependencies

```bash
  npm install
```

Set Environment Variables

```env
  GMAIL_APP_PASSWORD="Sample password"
```

Run the project

```bash
  node .\optimalSellPoint\sell.js
  node .\optimalSellPoint\sell.js
```


