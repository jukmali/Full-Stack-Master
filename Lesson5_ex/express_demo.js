// We take express module in use
const { response, request } = require("express");
var fs = require("fs");
require("dotenv").config();
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// Let's take bodyParser in use in express application
app.use(bodyParser.urlencoded({extended: true}));


//Let's give the material from the public folder
app.use(express.static("./public"));

app.set("view engine","ejs");
// app.set("views", "myviews"); // other than views


// We create routes and functions on them
/* app.get("/", function(request,response){
    response.send("This is the front page");
}) */

// Serve a form to the user
app.get("/adduser", function(req, res) {
    res.sendFile(__dirname + "/public/adduser.html");
  });
  
  
  app.post("/adduser", function(req, res) {
    // Load the existing data from a file
    var data = require("./exampledata2.json");
  
  
    data.push({
      Name: req.body.name,
      Company: req.body.company,
      Email: req.body.email,
      Date: new Date()
    });
  
    // Convert the JSON object to a string format
    var jsonStr = JSON.stringify(data);
  
    // Write data to a file
    fs.writeFile("exampledata2.json", jsonStr, err => {
      if (err) throw err;
      console.log("It's saved!");
    });
    res.send(
      "Saved the data to a file. Browse to the /details to see the contents of the file"
    );
  });

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
    } else {
        response.send("Form submitted: " + email + " " + pass);
    }
    
}); 
app.get("/studentpages", function(request, response){
    response.send("Your are now in the seacret STUDENT PAGE!");
});

app.get("/details", function(request,response){
    var data = require(__dirname + '/exampledata2.json');
    
    //parse result in the table
    var results = '<table border="1">'
    for (var i = 0; i < data.length; i++){
        results +=
        '<tr>'+
        '<td>' + data[i].Name + '</td>' +
        '<td>' + data[i].Email + '</td>' +
        '</tr>';

    };

    response.send(results);

});

app.get("/blog", function(request, response){
    var data = {
        heading: "Blog page",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
    }
    response.render("pages/blog", data);
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

