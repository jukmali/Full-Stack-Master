// Use express-module
var express = require("express");
var app = express();

// This for the templates
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// Mongoose module
var mongoose = require("mongoose");
/* Let's take env parameters in use */
require("dotenv").config();


// Set userid and pw. To be set in Atlas pages
var user = process.env.MONGO_USERID
var pw = process.env.MONGO_PW

// Create connection script to db
const uri = "mongodb+srv://" + user + ":" + pw + "@cluster0.dld5m.mongodb.net/sample_mflix?retryWrites=true&w=majority";

// Make connection to database
 mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true});
 
// Make schema to your data model
const Movie = mongoose.model(
  "Movie",
  {
    title: String,
    year: Number,
    poster: String,
  },
  "movies" // REMARK! These operations are pointed to this collection
)

// Print the movies
app.get("/api/movies", function(req, res) {

  Movie.find({}, null, {limit:20}, function(err,results){
    //if err then return the fault code to browser
    if(err) {
      res.status(500).json("Fault in data search");
    } else {
      // Return the results as JSON-objects to browser
      res.status(200).json(results);
    };  
  });
});

// Add one movie - see how to read the POST parameters
app.post("/api/add", function(req, res) {
  
  res.send("Add movie: " + req.body.title + " (" + req.body.year + ")");
});

// Modify the information of movie by ID number.See how to read the ID
app.put("/api/modify/:id", function(req, res) {
  res.send("Modify movie by " + req.params.id);
});

// Remove movie by ID. See how to read the ID
app.delete("/api/remove/:id", function(req, res) {
  // Take the id for the delete operation
  var id = req.params.id;

  Movie.findByIdAndDelete(id, function (err, results) {
      // Database error handling 
      if (err) {
       console.log(err);
       res.status(500).json("Fault in delete operation.");
    } // Tietokanta ok, but object cannot be found
      else if (results == null) {
       res.status(200).json("Cannot be deleted as object cannot be found.");
    } // Successful delete operation
      else {
      console.log(results);
      res.status(200).json("Deleted " + id + " " + results.title);
    }
  });
});

// Web server by express
var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("Example app is listening on port %d", PORT);
});
