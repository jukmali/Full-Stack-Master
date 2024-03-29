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
  
   var jdataObj = {
     Name: req.body.name,
     Company: req.body.company,
      Email: req.body.email,
      Date: new Date()
   }
    data.push(jdataObj);
  
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
var email = "";
var pass = "";
app.post("/signin" , function(request,response){
    // POST
    email = request.body.email;
    pass = request.body.pass;
    console.log(email);
    console.log(pass);
    // console.log(process.env);
    //response.send("Form was submitted: " + email + " " + pass);

    if(email == process.env.USERID && pass == process.env.PASSWORD){
        //response.redirect("/studentpages");
        console.log("redirect");
        response.send("SUCCESS");
    } else {
        response.send("Form submitted: " + email + " " + pass);
    }
    
}); 
app.get("/studentpages", function(request, response){
    if(email == process.env.USERID && pass == process.env.PASSWORD){
        response.send("Your are now in the seacret STUDENT PAGE!");
    } else {
        response.send("You do not have permisson for this site!");
    }
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

