const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')


// get all workouts
const getWorkouts =  async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

// get a single workout 
const getWorkout = async (req, res) => {
    const { id } = req.params

    // verify is valid id
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: "No such workout"})
    }

    // get single workout
    const workout = await Workout.findById(id)

    // if not found, throw err
    if (!workout){
        return res.status(404).json({error: "No such workout"})
    }

    // if found, return workout
    res.status(200).json(workout)
}

// create new workout 
const createWorkout =  async (req, res) => {
    const {title, load, reps} = req.body

    // add doc to db
    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    // validate id
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: "Unable to delete. No such workout"})
    }

    // delete single workout
    const workout = await Workout.findOneAndDelete({_id: id})

    // if not found, throw err
    if (!workout){
        return res.status(404).json({error: "Unable to delete. No such workout"})
    }

    // if found, return workout
    res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params
    

    // validate id
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: "Unable to update. No such workout"})
    }

    // update single workout
    const workout = await Workout.findOneAndUpdate({_id: id}, {...req.body})

    // if not found, throw err
    if (!workout){
        return res.status(404).json({error: "Unable to update. No such workout"})
    }

    // if found, return updated workout
    res.status(200).json(workout)
}

module.exports  = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}