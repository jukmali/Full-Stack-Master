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
app.set("view engine","ejs"); // could be jade as well

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
        response.redirect("/studentpages");
        //response.send("you are in");
        //response.redirect("/blog");
    } else {
        response.send("Form was submitted: " + email + " " + pass);

    }
    
}); 
app.get("/blog", function(request, response){
    var data = {
        heading:"Blog page",
        text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    };
    
    response.render("pages/blog1", data);

});

app.get("/shopping", function(request,response){
    var shoppingList = {
        heading: "Shopping List",
        listItems: ["banana","apple","milk"],
    };
    response.render('pages/shopping', shoppingList);
});

app.get("/selection", function(request,response){
    var shoppingList = {
        heading: "Shopping List",
        listItems: ["banana","apple","milk"],
    };
    response.render('pages/selection', shoppingList);
});

app.get("/contact", function(request, response){
    // response.send("Contacts");
    var userData = [
        {name:"John", age: 25},
        {name:"Mary", age: 17},
        {name:"Mike", age: 30},
    ];

    response.render("pages/users", {users: userData});
});

app.get("/news", function(request, response){
    response.send("News");
});

app.get("/studentpages", function(request, response){
    response.send("You are now in the studentpages");
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

