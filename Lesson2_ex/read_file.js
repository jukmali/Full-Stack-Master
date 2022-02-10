var fs = require("fs");

console.log("Program started...");
var data = fs.readFileSync('example.txt');

console.log(data.toString());
console.log("Node continue ...");


console.log("Program ended");