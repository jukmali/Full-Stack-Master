// We take express module in use
const { response, request } = require("express");
require("dotenv").config();
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mysql = require("mysql");
var session = require("express-session");

app.set("view engine","ejs");

// Let's take bodyParser in use in express application
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(
    session({
        name:"session_demo",
        resave:true,
        saveUninitialized: true,
        secret:"secretkey",
        // How long time session is open
        cookie: {maxAge: 60 * 1000 *30}, // 60 * 1000ms = 60s * 30 = 30 min
    })
);


//Let's give the material from the public folder
app.use(express.static("./public"));


app.post("/signin" , function(request,response){
    // POST
    // Define connection parameters
    var con = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"logindemo",
    });
    var email = request.body.email;
    var pass = request.body.pass;
    console.log(email);
    console.log(pass);

    

    // Create query to database
    var query = `SELECT * FROM users WHERE userid ='${email}' and password='${pass}';`;
    console.log(query);
    
    // Create the connection to database
    con.connect(function(err){
        if(err) throw err;
        con.query(query,function(err,result,fields){
            if(err) console.log("Error in DB connection!" + err);
            else{
                console.log("Rows from query: " + result.length);
                if(result.length == 1){
                    // We save the session data here
                    request.session.loggedin = true;
                    request.session.email = email;
                    console.log("Successful connection!");
                    //response.write("success");
                    // response.render("./pages/index");
                    response.redirect("studentpages");
                } else {
                    console.log("Wrong userid or password");
                    response.send("Wrong userid or password");

                }
            };
        
         });
    });

}); 
app.get("/studentpages", function(request, response){
    if(request.session.loggedin == true){
        var data  = {
            email: request.session.email,
        };
        console.log("Session connection");
        
        response.render("./pages/index",data);
        // response.send("You " + request.session.email + " are now in the secret STUDENT PAGE!");
    } else {
        response.redirect("./form.html");
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

