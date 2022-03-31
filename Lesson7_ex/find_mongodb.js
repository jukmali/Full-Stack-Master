// Mongo db module
const MongoClient = require("mongodb").MongoClient;

/* Let's take env parameters in use */
require("dotenv").config();

// Set userid and pw. To be set in Atlas pages
var user = process.env.MONGO_USERID
var pw = process.env.MONGO_PW

// Create connection script to db
const uri = "mongodb+srv://" + user + ":" + pw + "@cluster0.dld5m.mongodb.net/sample_mflix?retryWrites=true&w=majority";

// Create connection object
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Let's make query as JSON-object. 
var query = {
  title: new RegExp("Jedi")
};

// Take connection to "sample_mflix" and collection "movies"
client.connect(err => {
  const collection = client.db("sample_mflix").collection("movies");
  if (err) throw err;
  // make query with collection-object
  collection
    .find(query) // Use query as parameter
    .limit(5) // Let's limit the results for 5
    .toArray(function(err, result) {
      // Return as JSON table
      if (err) throw err;
      console.log(result); // Print to console
      client.close(); // Close the connection
    });
});