const express = require('express');
const Workout = require('../models/workoutModel');
const {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')

const router = express.Router()

// GET all workouts
router.get('/', getWorkouts)

// GET workout with id
router.get('/:id', getWorkout)

// POST a new workout
router.post('/', createWorkout)

// DELETE a workout with id
router.delete('/:id', deleteWorkout)

// UPDATE a workout with id
router.patch('/:id', updateWorkout)

module.exports = router;