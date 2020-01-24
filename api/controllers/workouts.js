const mongoose = require("mongoose");

const Workout = require("../models/workouts").Workout;
const Exercise = require("../models/workouts").Exercise;

exports.add_workout = (req, res, next) => {
  const workout = new Workout({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    trainer: req.body.trainerId
  });

  req.body.exercises.forEach(exercise => {
    workout.exercises.push(exercise);
  });

  workout
    .save()
    .then(result => {
      res.status(201).json({
        message: "Workout created",
        id: result._id
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.get_workouts = (req, res, next) => {
  Workout.find({ trainer: req.params.userId })
    // .populate("trainer")
    .exec()
    .then(workouts => {
      res.status(200).json({
        workouts: workouts
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

// The following end points are to load the data once in the database
// The loadWorkoutsToDb script can be used to load the data
exports.add_exercise = (req, res, next) => {
  const exercise = new Exercise({
    _id: new mongoose.Types.ObjectId(),
    exercise: req.body.name
  });

  exercise
    .save()
    .then(result => {
      res.status(201).json({
        message: "Exercise created"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.get_exercises = (req, res, next) => {
  Exercise.find()
    .exec()
    .then(exercises => {
      res.status(200).json({
        exercises: exercises
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
