var fs = require("fs");

console.log("Program started...");
var comb ="";
fs.readFile('example.txt', function(err,data){
    if(err) console.log(err);
    console.log("File was read");

    fs.readFile("example2.txt", function(err,data2){
        if(err) throw err;
        console.log('Another file is read!');

        comb = data.toString() +"\n" + data2.toString();
        fs.writeFile('combiningfiles.txt',comb, function(err){
            if(err) throw err;
            console.log('Files are written!')
        })
    });
});

//comb = data.toString() + data1.toString();
//console.log(comb);


console.log("Program ended");