// Mongo db module
const MongoClient = require("mongodb").MongoClient;

/* Let's take env parameters in use */
require("dotenv").config();

// Set userid and pw. To be set in Atlas pages
var user = process.env.MONGO_USERID
var pw = process.env.MONGO_PW

// Create connection script to db
//const uri = "mongodb+srv://" + user + ":"+ pw + "@cluster0.nqnlt.mongodb.net/?retryWrites=true&w=majority";
const uri = "mongodb+srv://" + user + ":"+ pw + "@cluster0.nqnlt.mongodb.net/sample_mflix?retryWrites=true&w=majority";


// Create connection object
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Let's make query to check the new data
var query = {
    userid: new RegExp("happy")
  };
  
  // New data object
  var newMovie = {
    userid: "happy.lector@laurea.fi",
    password: "ope",
  };
  
  // Let's make connection to "sample_mflix" and there the collection "movies"
  client.connect(err => {
    const collection = client.db("connectionDB").collection("passwords");
    if (err) throw err;
  
    // Make addision with collection-object
    collection.insertOne(newMovie, function(err, r) {
      // How many objects have been included (1)
      //console.log(r.insertedCount);
    });
  
    // Check that new addition is in the db
    collection
      .find(query) // Here is used the query
      .limit(5) // Limit results
      .toArray(function(err, result) {
        // Return as JSON table
        if (err) throw err;
        console.log(result); //Print to console
        client.close(); // Close the connection
      });
  });
