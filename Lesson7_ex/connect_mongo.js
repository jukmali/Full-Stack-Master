
/* Take the mongo module */
const MongoClient = require("mongodb").MongoClient;

/* Let's take env parameters in use */
require("dotenv").config();

/* console.log(process.env); */
var user = process.env.MONGO_USERID
var pw = process.env.MONGO_PW

// Create connection script to db
//const uri = "mongodb+srv://" + user + ":" + pw + "@cluster0.dld5m.mongodb.net/test?retryWrites=true&w=majority";
const uri = "mongodb+srv://" + user + ":"+ pw + "@cluster0.nqnlt.mongodb.net/?retryWrites=true&w=majority";


/* Connection object */

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

/* Let's make the connection */
async function connect(){
        
    try{
        await client.connect();
        console.log("Connected to MONGO");
        

    } catch (e){
        console.error(e);
    } finally {
        await client.close();
        console.log("Connection closed to MONGO");
    }

}

connect();