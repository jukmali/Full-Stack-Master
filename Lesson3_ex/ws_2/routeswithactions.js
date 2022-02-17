var http = require("http");
var fs = require("fs");

  
var server = http.createServer(function(request,response){

    if(request.url === "/"){
        response.writeHead(200,{'Content-Type': 'text/plain'});
        response.end('Hello from first home page!');
    }
    if(request.url === "/frontpage"){
        fs.readFile('frontpage.html',function(err,data){
            if(err) throw err;
            response.writeHead(200,{'Content-Type': 'text/html'});
            console.log(data.toString());
            response.write(data.toString());
            response.end("End of the form!");
            
        });

    }
    if(request.url === "/contact"){
        fs.readFile('contact.html',function(err,data){
            if(err) throw err;
            response.writeHead(200,{'Content-Type': 'text/html'});
            //console.log(data.toString());
            response.write(data);
            response.end("End of the contact!");
            
        });

    }
    if(request.url === '/json'){
        var data = require('./sampledata.json');
        response.writeHead(200,{'Content-Type': 'application/json'});
        data.push({name:"Ny Name", gender:"male"});
        var text = JSON.stringify(data);
        response.write(text);
        response.end('');
    }; 
    
});
var port = process.env.PORT || 3000;
server.listen(port);
console.log('Server is running at http://localhost:%d',port);