import mongoose from 'mongoose';
  const { Schema } = mongoose;

  const workoutSchema = new Schema(
    {
    day: { type: Date, default: Date.now },
    exercises: [
      {
        type: { type: String, required: "question" },
        name: { type: String, required: "question" },
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