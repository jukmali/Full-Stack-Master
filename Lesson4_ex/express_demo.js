// We take express module in use
const { response, request } = require("express");
require("dotenv").config();
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// Let's take bodyParser in use in express application
app.use(bodyParser.urlencoded({extended: true}));


//Let's give the material from the public folder
app.use(express.static("./public"));

// We create routes and functions on them
/* app.get("/", function(request,response){
    response.send("This is the front page");
}) */

app.post("/signin" , function(request,response){
    // POST
    var email = request.body.email;
    var pass = request.body.pass;
    console.log(email);
    console.log(pass);
    // console.log(process.env);
    //response.send("Form was submitted: " + email + " " + pass);

    if(email == process.env.USERID && pass == process.env.PASSWORD){
        response.redirect("/studentpages")
    } else {
        response.send("Form was submitted: " + email + " " + pass);

    }
    
}); 
app.get("/studentpages", function(request, response){
    response.send("Your are now in the seacret student page!");
});

app.get("/contact", function(request, response){
    response.send("Contacts");
    response.render("pages/contacts");
});

app.get("/news", function(request, response){
    response.send("News");
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

