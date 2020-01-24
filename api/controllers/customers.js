const mongoose = require("mongoose");

const Customer = require("../models/customers");

exports.add_customer = (req, res, next) => {
  const customer = new Customer({
    _id: new mongoose.Types.ObjectId(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    trainer: req.body.trainerId
  });

  customer
    .save()
    .then(result => {
      res.status(201).json({
        message: "Customer created",
        id: result._id
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.get_customers = (req, res, next) => {
  Customer.find({ trainer: req.params.userId })
    // .populate("trainer")
    .exec()
    .then(customers => {
      res.status(200).json({
        customers: customers
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
