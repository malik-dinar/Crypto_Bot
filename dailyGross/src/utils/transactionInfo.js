const Transaction = require("../models/transaction");

exports.getBoughtQuantity = async (name) => {
  const totalQuantity = await Transaction.aggregate([
    {
      $match: {
        name: name,
        isBought: true,
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$quantity",
        },
      },
    },
  ]);
  return totalQuantity[0].total;
};

exports.getSellQuantity = async (name) => {
  const totalQuantity = await Transaction.aggregate([
    {
      $match: {
        name: name,
        isBought: false,
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$quantity",
        },
      },
    },
  ]);
  return totalQuantity[0]?.total ?? 0;
};

exports.checkCoin = async (name) => {
  return await Transaction.findOne({ name });
};
