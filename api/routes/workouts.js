const express = require("express");
const router = express.Router();

const WorkoutsController = require('../controllers/workouts');

router.post("/exercise", WorkoutsController.add_exercise);
router.get("/exercises", WorkoutsController.get_exercises);

router.post("/", WorkoutsController.add_workout);
router.get("/:userId", WorkoutsController.get_workouts);

module.exports = router;
