// Use express-module
var express = require("express");
var app = express();

// This for the templates
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// Mongo db module
const MongoClient = require("mongodb").MongoClient;

/* Let's take env parameters in use */
require("dotenv").config();

// Set userid and pw. To be set in Atlas pages
var user = process.env.MONGO_USERID
var pw = process.env.MONGO_PW

// Create connection script to db
const uri = "mongodb+srv://" + user + ":" + pw + "@cluster0.dld5m.mongodb.net/sample_mflix?retryWrites=true&w=majority";

// Make the routes

// Print the movies
app.get("/api/movies", function(req, res) {
    // Create connection object
    const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

    //res.send("Printout the movies.");
    
    // Take connection to "sample_mflix" and collection "movies"
    var data = "";
    client.connect(err => {
    const collection = client.db("sample_mflix").collection("movies");
    if (err) throw err;
    // make query with collection-object
    collection
      .find() // Use empty find to show all contents
      .limit(10)
      .toArray(function(err, result) {
        // Return as JSON table
        if (err) throw err;
        console.log(result); // Print to console
        res.send(result); // Return the result
        client.close(); // Close the connection
      });
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
  res.send("Remove the movie by " + req.params.id);
});

// Web server by express
var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log("Example app is listening on port %d", PORT);
});
