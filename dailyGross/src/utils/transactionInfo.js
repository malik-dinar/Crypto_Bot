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
  return totalQuantity[0]?.total ?? 0 ;
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

exports.getBuyedDatas = async () => {
  let result = await Transaction.aggregate([
    {
      $match: {
        isBought: true,
        date: new Date().toISOString().split("T")[0],
      },
    },
    {
      $project: {
        _id: 0,
        values: {
          $map: {
            input: { $range: [0, "$quantity"] },
            as: "i",
            in: "$price",
          },
        },
      },
    },
    {
      $unwind: "$values",
    },
    {
      $group: {
        _id: null,
        values: { $push: "$values" },
      },
    },
    {
      $project: {
        _id: 0,
        values: 1,
      },
    },
  ]);

  return result[0]?.values ?? [] ;

};

exports.getSelledDatas = async () => {
  let result = await Transaction.aggregate([
    {
      $match: {
        isBought: false,
        date: new Date().toISOString().split("T")[0],
      },
    },
    {
      $project: {
        _id: 0,
        values: {
          $map: {
            input: { $range: [0, "$quantity"] },
            as: "i",
            in: "$price",
          },
        },
      },
    },
    {
      $unwind: "$values",
    },
    {
      $group: {
        _id: null,
        values: { $push: "$values" },
      },
    },
    {
      $project: {
        _id: 0,
        values: 1,
      },
    },
  ]);
  return result[0]?.values ?? [] ;
};
