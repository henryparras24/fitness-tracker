const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout",  
{ 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
  useFindAndModify: false
}
);


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

  app.get("/exercise", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
  });

  app.get("/stats", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/stats.html"));
  });



// Read last workout > WORK
app.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: { 
            $sum: "$exercises.duration"
          }
        }
      }
    ])
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
  });


// create a new workout
app.post("/api/workouts", (req, res) =>{
    db.Workout.create({})
    .then(newWorkout => {
      console.log(newWorkout);
      res.json(newWorkout);
    })
    .catch(err => {
      res.json(err);
    });
  });


// update a workout 
app.put("/api/workouts/:id", (req, res) => {
    console.log(req.body)
      db.Workout.findOneAndUpdate(
          {_id: req.params.id}, { 
              $push: { exercises: req.body } }, { new: true })
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });


// in a 7 day range of workouts
app.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: { 
            $sum: "$exercises.duration"
          }
        }
      }
    ])
    .limit(7)
    .then(newWorkout => {
      res.json(newWorkout);
    }).catch(err => {
      res.json(err);
    });
  });



  // delete a workout
  app.delete("/api/workouts/:id", (req, res) =>{
    db.Workout.findByIdAndDelete( req.params.id)
    .then(deletedWorkout => {
      res.json(deletedWorkout);
    }).catch(err => {
      res.json(err);
    });
  });



app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});