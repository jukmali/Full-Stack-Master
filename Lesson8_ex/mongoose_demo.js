// New module
var mongoose = require("mongoose");
/* Let's take env parameters in use */
require("dotenv").config();


// Set userid and pw. To be set in Atlas pages
var user = process.env.MONGO_USERID
var pw = process.env.MONGO_PW

// Create connection script to db
const uri = "mongodb+srv://" + user + ":" + pw + "@cluster0.dld5m.mongodb.net/mongoosedemo?retryWrites=true&w=majority";

// Connect to database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Define User Schema, i.e data model for the saving to collection
const User = mongoose.model("User", {
  username: String,
  password: Number,
  birthday: Date
});

//Define new object
var newUser = new User({
  username: "mattivirtanen",
  password: 1234,
  birthday: '2000-12-24'
});

// Save object to database
newUser.save(function(err, user) {
  if (err) return console.log(err);
  console.log(user);
});