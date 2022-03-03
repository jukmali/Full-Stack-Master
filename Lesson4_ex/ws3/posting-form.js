var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var app = express();

// Serve static files from the "public" directory
app.use(express.static("public"));

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// POST /login gets urlencoded bodies
app.post("/login", urlencodedParser, function(req, res) {
  if (!req.body) return res.sendStatus(400);
  console.log(req.body);
  res.send("welcome, " + req.body.name);
});

// Add data
app.post("/adduser", urlencodedParser, function(req, res) {
  console.log(req.body);

  var data = require("./exampledata.json");

  // Collect the post data and add it to JSON obj
  data.push({
    name: req.body.name,
    address: req.body.address,
    about: req.body.description
  });

  var jsonStr = JSON.stringify(data);

  //Write data to a file
  fs.writeFile("exampledata.json", jsonStr, function(err, data) {
    if (err) throw err;
    console.log("It's saved!");
  });

  res.send(jsonStr);
});

app.get("/details", function(req, res) {
  var data = require("./exampledata.json");

  // Parse the results into a variabke
  var results = '<table border="1"> ';

  for (var i = 0; i < data.length; i++) {
    results +=
      "<tr>" +
      "<td>" +
      data[i].name +
      "</td>" +
      "<td>" +
      data[i].address +
      "</td>" +
      "</tr>";
  }

  res.send(results);
});
app.listen(8081, function() {
  console.log("Example app listening on port 8080!");
});
