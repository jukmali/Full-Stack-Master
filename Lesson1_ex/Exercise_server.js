var http = require("http");

var server = http.createServer(function(request,response){

    if(request.url === "/"){
        response.writeHead(200,{'Content-Type': 'text/plain'});
        response.end('Hello from first home page!');
    }
    if(request.url === "/own"){
        response.writeHead(200,{'Content-Type': 'text/html'});
        response.write("<h1>Own page heading</h1>");
        response.end('<h2>Hello from own page</h2>');
    }
    
});

var port = process.env.PORT || 3000;
server.listen(port);
console.log('Server is running at http://localhost:%d',port);