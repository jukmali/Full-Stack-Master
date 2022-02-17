var fs = require("fs");
var http = require("http");


var server = http.createServer(function(request,response){

        response.writeHead(200,{'Content-Type': 'text/plain'});
        fs.readdir('../', function (err,data) {
            if(err) throw err;
            console.log('Results of readdir:');
            console.log(data.toString());
            console.log(data);
            response.write(data.toString());
            response.end('\n Hello from directory!');
        });

        // response.end('\n Hello from directory!');
    
    
});

var port = process.env.PORT || 3000;
server.listen(port);
console.log('Server is running at http://localhost:%d',port);