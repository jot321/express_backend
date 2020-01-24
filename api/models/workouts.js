const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema({
  exercise: { type: String },
  reps: { type: String },
  note: { type: String }
});

const workoutSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  description: { type: String, required: true },
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  exercises: { type: [exerciseSchema] }
});

module.exports = {
  Workout: mongoose.model("Workout", workoutSchema),
  Exercise: mongoose.model("Exercise", exerciseSchema)
};
