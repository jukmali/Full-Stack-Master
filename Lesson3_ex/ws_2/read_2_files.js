var fs = require("fs");

console.log("Program started...");
var data = fs.readFile('example.txt', results);
var data1 = fs.readFile('example2.txt',results2);

for (var i=0 ; i < 15 ; i++){
    console.log("Node just keeps on going while the is being read...");

}

function results(err,data){
    if(err) return console.error(err);
    console.log("Results of file read: ");
    console.log(data.toString());
}
function results2(err,data){
    if(err) return console.error(err);
    //console.log("Results of file read: ");
    console.log(data.toString());
}

console.log("Program ended");