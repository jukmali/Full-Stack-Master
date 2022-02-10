var fs = require("fs");

console.log("Program started...");
var data = fs.readFile('example.txt', function(data,err){
    if(err) throw err;
    console.log(data.toString());
});

for (var i=0 ; i < 15 ; i++){
    console.log("Node just keeps on going while the is being read...");

}