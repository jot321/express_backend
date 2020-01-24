const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true
  },
  amt: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);
