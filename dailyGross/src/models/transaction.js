const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    isBought:{
        type:Boolean
    },
    date:{
        type: Number,
        required: true
    }
  },
);

module.exports = mongoose.model("Transaction", transactionSchema);