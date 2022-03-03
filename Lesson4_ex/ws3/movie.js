var express = require("express");
var http = require('http');
var fs = require("fs");
var app = express();
const PORT = process.env.PORT || 3000 ;

// Require the module required for using form data
var bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true
  })
); // for parsing application/x-www-form-urlencoded

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

// Or we can parse out the details of movies

app.get("/details", function(req, result) {

 

var options = {
  hostname: 'www.omdbapi.com',
  //port: '1137',
  path: '/?s=star+wars&apikey=cbbc6750',
  //method: 'GET'
};

req = http.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)
  var data = '';
  res.on('data', chunck => {
    data += chunck;
    
    //process.stdout.write(chunck);
  });
  res.on('end' ,function() {
    jsData = JSON.parse(data);
    //console.log(jsData);
    
    // Parse the results into a variabke
  var results = '<table border="1"> ';

  for (var i = 0; i < jsData.Search.length; i++) {
    results +=
      "<tr>" +
      "<td>" +
      jsData.Search[i].Title +
      "</td>" +
      "<td>" +
      "<img src='" +
      jsData.Search[i].Poster +
      "'>" +
      "</td>" +
      "</tr>";
  };
  //console.log(results);
  result.send(results);
  });
});

req.on('error', error => {
  console.error(error)
});

req.end();
});

app.listen(PORT, function() {
  console.log("Example app listening on port 3000!");
});
