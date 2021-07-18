const mongoose = require('mongoose');
const Schema = mongoose.Schema;

  const workoutSchema = new Schema(
    {
    day: { type: Date, default: Date.now },
    exercises: [
      {
        type: { type: String, required: "question" },
        name: { type: String, required: "question" },
        distance: {type: Number},
        duration: { type: Number, required: "question" },
        weight: { type: Number},
        reps: { type: Number},
        sets: { type: Number}
    
  }
]
}
);

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;