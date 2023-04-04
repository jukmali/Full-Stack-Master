// Mongo db module
const MongoClient = require("mongodb").MongoClient;

/* Let's take env parameters in use */
require("dotenv").config();

// Set userid and pw. To be set in Atlas pages
var user = process.env.MONGO_USERID
var pw = process.env.MONGO_PW

// Create connection script to db
//const uri = "mongodb+srv://" + user + ":"+ pw + "@cluster0.nqnlt.mongodb.net/?retryWrites=true&w=majority";
//const uri = "mongodb+srv://" + user + ":"+ pw + "@cluster0.nqnlt.mongodb.net/sample_mflix?retryWrites=true&w=majority";
//const uri = "mongodb+srv://" + user + ":"+ pw + "@cluster0.dld5m.mongodb.net/?retryWrites=true&w=majority";
const uri = "mongodb+srv://" + user + ":"+ pw + "@cluster0.dld5m.mongodb.net/?retryWrites=true&w=majority";


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
  var newPerson = {
    userid: "happy.lector@laurea.fi",
    password: "ope",
    date: Date(),
  };
  
  async function connectAndInsert(){

    try{

      await client.connect();
      const collection = client.db("connectionDB").collection("passwords");

      collection.insertOne(newPerson);

      var result = await collection
        .find(query)
        .limit(5)
        .toArray();

      console.log(result)
  } catch (e) {
    console.log(e);

  } finally {
    await client.close();
  }
  }

  connectAndInsert();

