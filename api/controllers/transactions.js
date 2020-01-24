const mongoose = require("mongoose");

const Transaction = require("../models/transactions");

const aggregateTransactions = transactions => {
  aggregated_transactions = {};

  transactions.forEach(transaction => {
    aggregated_transactions[transaction.customer._id] =
      (aggregated_transactions[transaction.customer._id] || 0) +
      transaction.amt;
  });
  return aggregated_transactions;
};

exports.add_transaction = (req, res, next) => {
  const transaction = new Transaction({
    _id: new mongoose.Types.ObjectId(),
    trainer: req.body.trainerId,
    customer: req.body.customerId,
    amt: req.body.amt
  });

  transaction
    .save()
    .then(result => {
      res.status(201).json({
        message: "Transaction created",
        id: result._id
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.get_transactions = (req, res, next) => {
  Transaction.find({ trainer: req.params.trainerId })
    // .populate("customer")
    .exec()
    .then(transactions => {
      res.status(200).json({
        transactions: transactions,
        aggregated_transactions: aggregateTransactions(transactions)
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
