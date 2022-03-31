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

// Let's make query to check the new data
var query = {
    title: new RegExp("Jedi")
  };

// Let's make connection to "sample_mflix" and there the collection "movies"
client.connect(err => {
    const collection = client.db("sample_mflix").collection("movies");
    if (err) throw err;
      
    // Make update with collection-object
    collection.updateMany(
        { title: new RegExp("Jedi") },
        { $set: { year: 2013 } },
        function(err, r) {
        // Print the amount of the changes (1)
        console.log("Changed rows: " + r.modifiedCount);
    }
  );

  // Let's check that change is updated
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
