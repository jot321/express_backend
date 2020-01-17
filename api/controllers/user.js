const mongoose = require("mongoose");

const User = require("../models/user");

exports.user_signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          email: req.body.email
        });
        user
          .save()
          .then(result => {
            console.log(result);
            res.status(201).json({
              message: "User created"
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
      }
    });
};

exports.user_login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      console.log(user);
      return res.status(200).json({
        message: "Auth successful",
        userId: user._id
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

// exports.user_delete = (req, res, next) => {
//     User.remove({ _id: req.params.userId })
//         .exec()
//         .then(result => {
//             res.status(200).json({
//                 message: "User deleted"
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             });
//         });
// };
