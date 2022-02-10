var http = require("http");

var server = http.createServer(function(request,response){

        response.writeHead(200,{'Content-Type': 'text/html'});
        var data = require('./persons.json');
        console.log(data);
        var output = JSON.stringify(data);
        response.write(output);

        response.end('Hello from first home page!');
    
    
});

var port = process.env.PORT || 3000;
server.listen(port);
console.log('Server is running at http://localhost:%d',port);