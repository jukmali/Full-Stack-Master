
/* Take the mongo module */
const MongoClient = require("mongodb").MongoClient;

/* Let's take env parameters in use */
require("dotenv").config();

/* console.log(process.env); */
var user = process.env.MONGO_USERID
var pw = process.env.MONGO_PW

async function listDatabases(client){
    console.log("here we are");
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function main(){
// Create connection script to db

const uri = "mongodb+srv://" + user + ":"+ pw + "@cluster0.dld5m.mongodb.net/?retryWrites=true&w=majority";


/* Connection object */

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

/* Let's make the connection */

try{
    await client.connect();
    const collection = client.db("connectionDB").collection("passwords");
    
    var query = {
        userid: new RegExp("happy")
      };
   
    /*collection
    .find({userid:"happy.student@laurea.fi"}) // Use query as parameter
    .limit(5) // Let's limit the results for 5
    .toArray(function(err, result) {
      // Return as JSON table
      if (err) throw err;
      console.log(result); // Print to console
      //client.close(); // Close the connection
    }); */
   var result = await collection
    .find(query) // Use query as parameter
    .limit(5) // Let's limit the results for 5
    .toArray();

    console.log(result);
    //var items = collection.find(query).limit(3);
    //console.log(items);

    await listDatabases(client);
} catch (e){
    console.error(e);
} finally {
    await client.close();
}

}
main().catch(console.error);