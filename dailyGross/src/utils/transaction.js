const Transaction = require("../models/transaction");

exports.buyCoins = async (name, quantity, price) => {
  await Transaction.create({
    name,
    quantity,
    price,
    isBought: true,
    date: new Date().getDate(),
  });
};

exports.sellCoins = async (name, quantity, price) => {
  await Transaction.create({
    name,
    quantity,
    price,
    isBought: false,
    date: new Date().getDate(),
  });
};
