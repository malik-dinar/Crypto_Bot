const Transaction = require("../models/transaction");

exports.buyCoins = async (name, quantity, price) => {
  await Transaction.create({
    name,
    quantity,
    price,
    isBought: true,
    date: new Date().toISOString().split('T')[0]
  });
};

exports.sellCoins = async (name, quantity, price) => {
  await Transaction.create({
    name,
    quantity,
    price,
    isBought: false,
    date: new Date().toISOString().split('T')[0]
  });
};
