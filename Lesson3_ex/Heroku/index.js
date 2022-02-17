const PORT = process.env.PORT || 3000;cd 
var http = require("http");

// Create server object
http
    .createServer(function(request,response){
        response.writeHead(200,{"Content-Type":"text/html"});
        response.write('<figure><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ54AGakz6Q_pzbtoIQ8us_R61sDJlt7OPfgg&usqp=CAU"  style="width:600px; height:300px"></figure>');
        response.write("Source: https://scoutapm.com/"); // Write a response to the client
        response.end(""); // End response
    })
    .listen(PORT); // The server object listens on port