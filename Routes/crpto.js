const express = require('express');
const { sellPoint } = require('../optimalSellPoint/sell');
const { identifyBuyPoints } = require('../identifyBuyPoints');
const { buyCoin } = require('../dailyGross/buy');
const { sellCoin } = require('../dailyGross/sell');
const { dailyGross } = require('../dailyGross/dailyGross');
const router = express.Router();


// Iddentify Buy Points
router.get('/buy-point/:coin', identifyBuyPoints )


// Identify Optimal Sell points
router.get('/optimal-sell-point/:coin', sellPoint)





//1. buy coin pass coin and quantity as request
router.post('/buy-coin' , buyCoin )

//2. sell coin  pass coin and quantity as request
router.post('/sell-coin', sellCoin )

//3. daily profit
router.get('/daily-profit/:coin', dailyGross )


module.exports = router;
