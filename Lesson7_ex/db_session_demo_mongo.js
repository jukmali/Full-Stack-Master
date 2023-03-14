// We take express module in use
const { response, request } = require("express");
require("dotenv").config();
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
var session = require("express-session");

//app.set("view engine","ejs");

// Let's take bodyParser in use in express application
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(
    session({
        name:"session_demo",
        resave:true,
        saveUninitialized: true,
        secret:"secretkey",
        SameSite:"Lax",
        // How long time session is open
        cookie: {maxAge: 60 * 1000 *30}, // 60 * 1000ms = 60s * 30 = 30 min
    })
);


//Let's give the material from the public folder
app.use(express.static("./public"));


app.post("/signin" , function(request,response){
    // POST
    var email = request.body.email;
    var pass = request.body.pass;
    var req = request;
    console.log(email);
    console.log(pass);

    // Set userid and pw. To be set in Atlas pages
    var user = process.env.MONGO_USERID
    var pw = process.env.MONGO_PW
    //Create connection to MONGO
    //const uri = "mongodb+srv://" + user + ":"+ pw + "@cluster0.nqnlt.mongodb.net/sample_mflix?retryWrites=true&w=majority";
    const uri = "mongodb+srv://" + user + ":"+ pw + "@cluster0.dld5m.mongodb.net/?retryWrites=true&w=majority";
    
    /* Connection object */

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
    /* Let's make the connection */
    var result="";

    async function connect(){
        
        try{
            await client.connect();
            const collection = client.db("connectionDB").collection("passwords");
        
            var query = {
                userid: email,
                password: pass,
            };
       
            result = await collection
                .find(query) // Use query as parameter
                .limit(5) // Let's limit the results for 5
                .toArray();
    
            console.log(result);
            if (result.length === 1){
                // We save the session data here
                request.session.loggedin = true;
                request.session.email = email;
                console.log("Successful connection!");
                //response.redirect("./studentpages");
                response.send("SUCCESS");
            }
            else {
                response.send("Wrong userid or password!");
            }
    
        } catch (e){
            console.error(e);
        } finally {
            await client.close();
        }

    }
    
    connect();

}); 

app.get("/studentpages", function(request, response){
    if(request.session.loggedin == true){
        var data  = {
            email: request.session.email,
        };
        console.log("Session connection");
        
        response.redirect("./studentpage.html");
        //response.send("You " + request.session.email + " are now in the secret STUDENT PAGE!");
    } else {
        response.redirect("./form2.html");
    }
});


app.get("/logout", function(request,response){
    request.session.destroy(function(err){
        console.log("Session is destroyed");
        response.send("Session is closed");
    });
});


// IF route cannot be found
app.get("*", function(request, response){
    response.status(404).send("Can't find the requested page");
    //response.send("Can't find the requested page", 404);
});


//web server creation with Express
var PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log("Example app is listening on port %d", PORT);
});
 